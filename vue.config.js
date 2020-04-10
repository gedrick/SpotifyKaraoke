module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '^/logout': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '^/auth/spotify': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '^/auth/refresh': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
};
