
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-redux",
      "react-multi-carousel",
      '@redux/toolkit',
    ],
  },



  resolve: {
    dedupe: ["react", "react-dom"],

    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
