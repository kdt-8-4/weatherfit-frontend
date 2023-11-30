import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/app/detail/*.{tsx, ts}",
    "./src/app/*.{tsx,ts}",
    "./src/component/Profile.tsx",
    "./src/component/CategoryDetail.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: "#a8bbff",
        sub: "#d0dbff",
      },
    },
  },
  plugins: [],
};
export default config;
