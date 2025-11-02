import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      description: "Perfect for individuals and small teams getting started.",
      features: ["Up to 5 team members", "10 projects", "Basic reporting", "Email support", "Mobile app access"],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$29",
      description: "For growing teams that need advanced features.",
      features: [
        "Up to 25 team members",
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "Custom workflows",
        "API access",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For large organizations with complex needs.",
      features: [
        "Unlimited team members",
        "Unlimited projects",
        "Advanced security",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
        "On-premise option",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Choose the perfect plan for your team. All plans include a 14-day free trial.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border p-8 shadow-sm transition-all ${
                plan.highlighted
                  ? "border-accent bg-card shadow-lg ring-2 ring-accent/20 scale-105"
                  : "border-border bg-card hover:shadow-md"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-accent px-4 py-1 text-sm font-medium text-accent-foreground">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-card-foreground">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-base text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full" variant={plan.highlighted ? "default" : "outline"} size="lg">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
