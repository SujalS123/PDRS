module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Suppress source map warnings for @mediapipe
      webpackConfig.ignoreWarnings = [
        {
          module: /@mediapipe/,
          message: /Failed to parse source map/,
        },
      ];
      return webpackConfig;
    },
  },
}; 