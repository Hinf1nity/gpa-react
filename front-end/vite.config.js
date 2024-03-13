import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/cidimec/gpa-imt/",
  plugins: [
    react({
      parserOptions: {
        jsx: true,
      },
      parserPlugins: {
        // Configuración específica del analizador para diferentes tipos de archivos
        typescript: true,
      },
    }),
  ],
});
