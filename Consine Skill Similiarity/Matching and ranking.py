import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from Resumes import candidates
from Jobs import jobs
from Skills import SKILL_KEYWORDS

MIN_MATCH_SCORE = 0.30  # cutoff for "meets_threshold" on FINAL combined score
COSINE_WEIGHT = 0.6     # how much to weight text similarity
SKILL_WEIGHT = 0.4      # how much to weight skill overlap

# -------------------------------------------------
# 1. Helper: normalize text
# -------------------------------------------------
def normalize(text: str) -> str:
    return " ".join(text.lower().split())

# -------------------------------------------------
# 2. Helper: extract skills (simple keyword match)
#    Returns a set of normalized skills found in the text
# -------------------------------------------------
def extract_skills(text: str, skill_list):
    text_norm = normalize(text)
    found = []
    for skill in skill_list:
        if skill in text_norm:
            found.append(skill)
    return set(found)

# -------------------------------------------------
# 3. Compute cosine similarity between job text and ALL resumes
# -------------------------------------------------
def compute_cosine_scores(job_text, resumes_list):
    docs = [job_text] + resumes_list

    vectorizer = TfidfVectorizer(
        stop_words="english",
        lowercase=True,
        ngram_range=(1, 2)
    )
    tfidf_matrix = vectorizer.fit_transform(docs)

    job_vec = tfidf_matrix[0:1]
    cand_vecs = tfidf_matrix[1:]

    similarities = cosine_similarity(job_vec, cand_vecs).flatten()
    return similarities

# -------------------------------------------------
# 4. Compute skill overlap score
#    Jaccard-style: overlap / union
#    Gives 0.0 -> 1.0 where 1.0 means perfect skill match
# -------------------------------------------------
def compute_skill_overlap(job_skills, cand_skills):
    if not job_skills and not cand_skills:
        return 0.0
    if not job_skills:
        return 0.0
    inter = job_skills.intersection(cand_skills)
    union = job_skills.union(cand_skills)
    if len(union) == 0:
        return 0.0
    return len(inter) / len(union)

# -------------------------------------------------
# 5. Rank candidates for a single job
# -------------------------------------------------
def rank_candidates_for_job(job_row, candidates_df):
    job_id = job_row["job_id"]
    job_title = job_row["title"]
    job_desc = job_row["description"]

    # skill sets
    job_skills = extract_skills(job_desc, SKILL_KEYWORDS)

    # compute cosine similarity for this job vs all resumes
    cosine_scores = compute_cosine_scores(
        job_desc,
        list(candidates_df["resume"])
    )

    # build table
    ranked_rows = []
    for idx, cand in candidates_df.iterrows():
        cand_skills = extract_skills(cand["resume"], SKILL_KEYWORDS)

        cosine_score = float(cosine_scores[idx])  # 0-1-ish
        skill_score = compute_skill_overlap(job_skills, cand_skills)  # 0-1

        # weighted final score
        final_score = COSINE_WEIGHT * cosine_score + SKILL_WEIGHT * skill_score

        ranked_rows.append({
            "job_id": job_id,
            "job_title": job_title,
            "cand_id": cand["cand_id"],
            "name": cand["name"],
            "cosine_score": round(cosine_score, 4),
            "skill_score": round(skill_score, 4),
            "final_score": round(final_score, 4),
            "meets_threshold": final_score >= MIN_MATCH_SCORE,
            "job_skills": ", ".join(sorted(job_skills)),
            "cand_skills": ", ".join(sorted(cand_skills))
        })

    ranked_df = pd.DataFrame(ranked_rows)

    # sort by final score, high → low
    ranked_df = ranked_df.sort_values(
        by="final_score",
        ascending=False
    ).reset_index(drop=True)

    return ranked_df

# -------------------------------------------------
# 6. Run for ALL jobs
# -------------------------------------------------
def run_matching(jobs_list, candidates_list):
    jobs_df = pd.DataFrame(jobs_list)
    cands_df = pd.DataFrame(candidates_list)

    all_results = []
    for _, job_row in jobs_df.iterrows():
        ranked_for_job = rank_candidates_for_job(job_row, cands_df)
        all_results.append(ranked_for_job)

    final_df = pd.concat(all_results, ignore_index=True)

    # sort final output by job, then score
    final_df = final_df.sort_values(
        by=["job_id", "final_score"],
        ascending=[True, False]
    ).reset_index(drop=True)

    return final_df

# -------------------------------------------------
# 7. Execute and pretty print
# -------------------------------------------------
if __name__ == "__main__":
    final_df = run_matching(jobs, candidates)

    # save everything
    final_df.to_csv("all_candidates_with_skill_augmented_scores.csv", index=False)

    print(f"\n=== All Candidate Scores (threshold = {MIN_MATCH_SCORE*100:.0f}% on final_score) ===")
    for job_id, group in final_df.groupby("job_id"):
        job_title = group.iloc[0]["job_title"]
        print(f"\n--- {job_title} ({job_id}) ---")

        # pretty view
        display_cols = [
            "cand_id",
            "name",
            "final_score",
            "cosine_score",
            "skill_score",
            "meets_threshold"
        ]
        print(group[display_cols].to_string(index=False))

        # optional: show top 3 best-skill candidates for quick demo narrative
        print("\nTop skill overlaps / explanation:")
        explain_cols = [
            "cand_id",
            "name",
            "job_skills",
            "cand_skills"
        ]
        print(group.head(3)[explain_cols].to_string(index=False))
        print("-" * 60)
