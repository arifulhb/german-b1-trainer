import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative base so the build works under any path (e.g. GitHub Pages
  // project sites served from /<repo>/). Safe here because the app has no router.
  base: "./",
  plugins: [react()],
});
