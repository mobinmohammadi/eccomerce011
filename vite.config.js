import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-redux",
      "react-multi-carousel",
      "@reduxjs/toolkit", 
    ],
  },

  resolve: {
    dedupe: ["react", "react-dom"]
  },
});
