import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Ensure correct relative path
  server: {
    proxy: {
      "/send-email": "https://nodemailer-production.up.railway.app", // Ensure the correct backend URL
    },
  },
});
