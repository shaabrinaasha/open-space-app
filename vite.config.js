import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    host: "localhost",
    port: 5173,
    environment: "jsdom",
  },
});
