const { colors, fonts } = require("./src/theme/tokens.ts");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: {
        inter: [fonts.regular],
        "inter-medium": [fonts.medium],
        "inter-semibold": [fonts.semibold],
        "inter-bold": [fonts.bold],
      },
    },
  },
  plugins: [],
};
