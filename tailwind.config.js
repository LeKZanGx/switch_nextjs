const colors = require("tailwindcss/colors");
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      b: "#242424",
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      slate: colors.slate,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      lime: colors.lime,
      emerald: colors.emerald,
      green: colors.green,
      blue: colors.blue,
      purple: colors.purple,
      pink: colors.pink,
      rose: colors.rose,
      fuchsia: colors.fuchsia,
      sky: colors.sky,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    fontFamily: {
      kanit: ['"Kanit"', "sans-serif"],
      silkscreen: ['"Silkscreen"', "cursive"],
      ChakraPetch: ['"Chakra Petch"', "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}