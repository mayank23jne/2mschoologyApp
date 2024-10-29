import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.schoology.app',
  appName: 'schoology',
  webDir: 'www',
  server: {
    androidScheme: "http",
    cleartext: true,
  },
  plugins: {
    CapacitorHttp: {
      enabled: false,
    },
  },
};

export default config;
