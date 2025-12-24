import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    animationDelay: {
      100: "100ms",
      200: "200ms",
      3000: "3000ms",
      400: "400ms",
    },
    colors: {
      blue: "var(--color-blue)",
      blue40: "var(--color-blue40)",
      white: "var(--color-white)",
      textWhite: "var(--color-textWhite)",
      black: "var(--color-black)",
      red: "var(--color-red)",
      lightred: "var(--color-lightred)",
      warningRed: "var(--color-warningRed)",
      "light-blue-clear": "var(--color-light-blue-clear)",
      "sky-blue": "var(--color-sky-blue)",
      "light-blue": "var(--color-light-blue)",
      "light-blue2": "var(--color-light-blue2)",
      darkBlue: "var(--color-darkBlue)",
      sliderNavBtnBlue: "var(--color-sliderNavBtnBlue)",
      sliderNavBtnBlueHover: "var(--color-sliderNavBtnBlueHover)",
      "scroll-color": "var(--color-scroll-color)",
      darkgray: "var(--color-darkgray)",
      gray3: "var(--color-gray3)",
      gray: "var(--color-gray)",
      lightgray: "var(--color-lightgray)",
      "dark-blue": "var(--color-dark-blue)",
      "modal-background": "var(--color-modal-background)",
      "light-gray-v2": "var(--color-light-gray-v2)",
      lightgray3: "var(--color-lightgray3)",
      gray2: "var(--color-gray2)",
      backdrop: "var(--color-backdrop)",
      scrollColor: "var(--color-scrollColor)",
      whiteBackdrop: "var(--color-whiteBackdrop)",
      yellow: "var(--color-yellow)",
      "light-sky-blue": "var(--color-light-sky-blue)",
      transparent: "transparent",
      green: "var(--color-green)",
      blue2: "var(--color-blue2)",
      gray4: "var(--color-gray4)",
      successGreen: "var(--color-successGreen)",
      yellow2: "var(--color-yellow2)",
      red2: "var(--color-red2)",
      borderGray: "var(--color-borderGray)",
      cardBtnBg: "var(--color-cardBtnBg)",
      sliderArrowBg: "var(--color-sliderArrowBg)",
      placeholderColor: "var(--color-placeholderColor)",
      green2: "var(--color-green2)",
      borderColor: "var(--color-borderColor)",
      inputColor: "var(--color-inputColor)",
      gray5: "var(--color-gray5)",
      black2: "var(--color-black2)",
      "gray-scroll": "var(--color-gray-scroll)",
      selection: "var(--color-selection)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-linear": "linear-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        shadow15px: "0px 0px 15px 0px rgba(188, 188, 188, 0.20)",
        stickyHeaderShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        goToTopShadow: "0px 4px 15px 0px rgba(75, 75, 75, 0.25)",
        sliderArrowShadow: "box-shadow: 0px 0px 15px 0px #BCBCBC33;",
        cartBtnShadow: "0px -1px 3px 0px rgba(0, 0, 0, 0.1)",
        sortBoxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
        globalShadow: "0px 0px 10px 0px #0000001A",
        lightImageBlur: "0px 0px 9999em 120px #F8F8F8",
      },
      transitionDuration: {
        "5000": "5000ms", // 5 seconds
      },
      keyframes: {
        underlineAnim: {
          "0%": {
            scaleX: "0",
          },
          "100%": {
            scaleX: "1",
          },
        },
        typing: {
          "0%": {
            width: "0",
            visibility: "hidden",
          },
          "100%": {
            width: "105px",
            visibility: "visible",
          },
        },
        typingSeecondInputText: {
          "0%": {
            width: "0",
            visibility: "hidden",
          },
          "100%": {
            width: "225px",
            visibility: "visible",
            display: "block",
          },
        },
        "reverse-typing": {
          "0%": { width: "100%", visibility: "visible" },
          "100%": { width: "0", visibility: "hidden" },
        },
        slideInDown: {
          from: {
            transform: "translateY(-50%)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideOutUp: {
          from: {
            transform: "translateY(0)",
            opacity: "1",
          },
          to: {
            transform: "translateY(-50%)",
            opacity: "0",
          },
        },
        slideInRight: {
          from: {
            transform: "translateX(50%)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideOutLeft: {
          from: {
            transform: "translateX(0)",
            opacity: "1",
          },
          to: {
            transform: "translateX(-50%)",
            opacity: "0",
          },
        },
        slideOutTop: {
          from: {
            transform: "translateY(0)",
            opacity: "1",
          },
          to: {
            transform: "translateY(-50%)",
            opacity: "0",
          },
        },
        slideInUp: {
          from: {
            transform: "translateY(50%)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideOutDown: {
          from: {
            transform: "translateY(0)",
            opacity: "1",
          },
          to: {
            transform: "translateY(50%)",
            opacity: "0",
          },
        },
      },
      animation: {
        typing: "typing 2s forwards ",
        typingSeecondInputText: "typingSeecondInputText 2s forwards",
        "reverse-typing": "reverse-typing 0.5s forwards",
        "slide-in-down": "slideInDown 0.25s ease-in-out forwards",
        "slide-out-up": "slideOutUp 0.25s ease-in-out forwards",
        "slide-in-right": "slideInRight 0.25s ease-in-out forwards",
        "slide-out-left": "slideOutLeft 0.25s ease-in-out forwards",
        "slide-out-top": "slideOutTop 0.25s ease-in-out forwards",
        "slide-in-up": "slideInUp 0.25s ease-in-out forwards",
        "slide-out-down": "slideOutDown 0.25s ease-in-out forwards",
      },
    },

    screens: {
      xs: { min: "0", max: "500px" },
      sm: { min: "0", max: "766px" },
      md: { min: "767px", max: "1023px" },
      from834: { min: "834px" },
      lg: { min: "1024px" },
      xl: { min: "1200px" },
    },

    // screens: {
    //   sm: { min: "0px", max: "767px" },
    //   md: { min: "768px", max: "1023px" },
    //   lg: { min: "1024px" },
    // },

    fontFamily: {
      mont: ["__Montserrat_b1da2a", "__Montserrat_Fallback_b1da2a"],
    },
  },
  safelist: [
    ...[...Array(101)].flatMap((a, i) => [`w-[${i}%]`]), // all width percentage classes
    ...[...Array(100)].flatMap((a, i) => [`h-[${i * 40}px]`]),
    "mt-[40px]",
    "mt-[12px]",
    "animate-slide-in-down",
    "animate-slide-out-up",
    "animate-slide-in-right",
    "animate-slide-out-left",
    "animate-slide-out-top",
    "animate-slide-in-up",
    "animate-slide-out-down",
  ],
  plugins: [],
};
export default config;
