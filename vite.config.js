import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path"; // بهتر است از node:path استفاده شود

export default defineConfig({
  plugins: [react(), tailwindcss()],

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-redux",
      "react-multi-carousel",
      "@reduxjs/toolkit", // نکته: نام صحیح این پکیج @reduxjs/toolkit است
    ],
  },

  resolve: {
    dedupe: ["react", "react-dom"],

    alias: {
      "@": path.resolve(import.meta.dirname, "./src"), 
    },
  },
});