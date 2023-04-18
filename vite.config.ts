import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	server: {
		https: {
			key: fs.readFileSync('../ssl/key.pem'),
			cert: fs.readFileSync('../ssl/cert.pem'),
		},
		host: '0.0.0.0',
	},
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
