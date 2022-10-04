import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '/@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  server: {
    proxy: {
      '/blog': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/blog/, '')
      }
    }
  }
});
