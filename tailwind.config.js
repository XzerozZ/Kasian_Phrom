/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./index.js", "./app/*.{js,jsx,ts,tsx}", "./*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2A4296",
        secondary: "#FCE49E",
        neutral: "#FCFCFC",
        neutral2: "#DBDFEC",
        normalText: "#070F2D",
        accent: "#F68D2B",
        secondaryAccent: "#FFB36C",
        primary2: "#6780D6",
        secondary2: "#FFECB6",
        secondary3: "#FFF4D7",
        label: "#979797",
        unselectMenu: "#B0B0B0",
        lightBgChart: "#C9C9C9",
        unselectInput: "#DBDFEC",
        lowUnselectInput: "#E4E8F5",
        ok: "#83FF83",
        err: "#FF5449",
        banner: "#C8D4FF",
        bgAuth: "#E4ECFF",
        oktext:'#30CC30',
        bgmenu_Finance:'#d8feb2',
        bgmenu_Testfinance:'#fecdb2',
        bgmenu_Change:'#c8e8fe',
        bgmenu_Money:'#fef5b2',
        bgmenu_mean:'##feefc4',
        bg_debt:'#FFEAEA',

      },
    },
  },
  plugins: [],
}