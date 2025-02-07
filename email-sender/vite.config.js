export default defineConfig({
  server: {
    proxy: {
      "/send-email": {
        target: "https://nodemailer-production.up.railway.app", // Ensure it has HTTP/HTTPS
        changeOrigin: true,
        secure: false, // Set to false if your backend does not support HTTPS
      },
    },
  },
});
