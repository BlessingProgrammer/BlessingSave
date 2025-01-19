import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin],
};

