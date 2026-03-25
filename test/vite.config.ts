import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "next/link": path.resolve(__dirname, "./src/shims/next-link.tsx"),
      "next/navigation": path.resolve(
        __dirname,
        "./src/shims/next-navigation.tsx",
      ),
    },
  },
})

