import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/send-email": {
        target: "https://nodemailer-production.up.railway.app", // Ensure it's a valid URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
