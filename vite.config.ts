import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno (como API_KEY)
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Esto inyecta la API KEY de Vercel en tu código de frontend de forma segura para la build
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});