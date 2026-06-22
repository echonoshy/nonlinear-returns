import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = process.env.BASE_PATH
  ?? (process.env.GITHUB_ACTIONS && repositoryName ? `/${repositoryName}/` : "/");

export default defineConfig({
  root: "src",
  publicDir: "../public",
  base,
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(projectRoot, "src/index.html"),
        episode01: resolve(projectRoot, "src/episodes/01.html")
      }
    }
  }
});
