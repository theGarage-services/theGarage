import { Platform, Linking } from 'react-native';

// Platform-specific utilities
export const platformUtils = {
  // Open URL in appropriate way for each platform
  openURL: async (url: string) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error("Don't know how to open URI: " + url);
      }
    }
  },

  // Make phone call (mobile only)
  makePhoneCall: async (phoneNumber: string) => {
    if (Platform.OS !== 'web') {
      const url = `tel:${phoneNumber}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }
  },

  // Send email
  sendEmail: async (email: string, subject?: string, body?: string) => {
    let url = `mailto:${email}`;
    const params = [];
    
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    if (Platform.OS === 'web') {
      window.location.href = url;
    } else {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }
  },

  // Share content (mobile only)
  shareContent: async (content: { title?: string; message: string; url?: string }) => {
    if (Platform.OS !== 'web') {
      try {
        const { Share } = await import('react-native');
        await Share.share({
          title: content.title,
          message: content.message,
          url: content.url,
        });
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      // Web fallback - copy to clipboard or use Web Share API
      if (navigator.share && content.url) {
        try {
          await navigator.share({
            title: content.title,
            text: content.message,
            url: content.url,
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      } else {
        // Fallback to copying to clipboard
        try {
          await navigator.clipboard.writeText(content.message + (content.url ? ` ${content.url}` : ''));
        } catch (error) {
          console.error('Error copying to clipboard:', error);
        }
      }
    }
  },

  // Get platform-specific styles
  getPlatformStyle: (styles: {
    ios?: any;
    android?: any;
    web?: any;
    default?: any;
  }) => {
    return Platform.select(styles) || styles.default || {};
  },

  // Check if running in development mode
  isDevelopment: () => {
    return __DEV__;
  },

  // Get platform version
  getPlatformVersion: () => {
    return Platform.Version;
  },

  // Check for specific iOS version
  isIOSVersionAtLeast: (version: number) => {
    return Platform.OS === 'ios' && Platform.Version >= version;
  },

  // Check for specific Android API level
  isAndroidAPIAtLeast: (apiLevel: number) => {
    return Platform.OS === 'android' && Platform.Version >= apiLevel;
  },
};