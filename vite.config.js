import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // use describe/it/expect without importing them
    environment: "jsdom",   // simulate a browser
    setupFiles: "./src/test/setup.js",
  },
});