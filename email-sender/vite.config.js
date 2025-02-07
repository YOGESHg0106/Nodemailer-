export default defineConfig({
  server: {
    proxy: {
      "/send-email": "nodemailer-production.up.railway.app", // Use your Railway backend URL
    },
  },
});
