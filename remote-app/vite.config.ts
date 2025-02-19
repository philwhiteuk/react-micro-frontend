import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    cors: true,
  },
  build: {
    rollupOptions: {
      output: {
        format: "iife",
        entryFileNames: "remote-app.js",
      },
    },
  },
});
