import { visualizer } from 'rollup-plugin-visualizer';

export default {
  build: {
    rollupOptions: {
      plugins: [visualizer()]
    }
  }
}