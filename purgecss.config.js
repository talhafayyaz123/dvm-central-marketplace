module.exports = {
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
    ],
    css: ['styles/combined.css'],
    output: 'styles/purged.css',
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: {
      standard: [
        /^swiper-/,
        /^react-/,
        '#nprogress',
        'rr--',
      ],
    },
  };