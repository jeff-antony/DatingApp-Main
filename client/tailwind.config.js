// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-primary": "#4b164c",
        "blue-link": "#0b69ff",
        "font-white": "#fff",
        darkslategray: "rgba(51, 51, 51, 0.8)",
        "gray-1": "#333",
        border: "#cfd8dc",
        "background-brand-secondary": "#e6e6e6",
        gray: {
          "100": "#797c7b",
          "200": "#282827",
          "300": "#242424",
          "400": "#0b0a0a",
          "500": "#000e08",
          "600": "#010101",
          "700": "rgba(255, 255, 255, 0.3)",
          "800": "rgba(255, 255, 255, 0.4)",
          "900": "rgba(255, 255, 255, 0.7)",
          "1000": "rgba(34, 23, 42, 0.5)",
          "1100": "rgba(0, 0, 0, 0.2)",
          "1200": "rgba(255, 255, 255, 0.2)",
        },
        whitesmoke: "#f6f7f6",
        "border-default-default": "#d9d9d9",
        "text-default-default": "#1e1e1e",
        "text-default-secondary": "#757575",
        "background-brand-default": "#2c2c2c",
        "background-neutral-hover": "#434343",
        "text-brand-on-brand": "#f5f5f5",
        black: "#000",
        "main-black": "#22172a",
        "greyscale-grey-200": "#e5e6eb",
        darkslateblue: "rgba(75, 22, 76, 0.2)",
        "main-secondary-1": "#dd88cf",
        plum: "rgba(221, 136, 207, 0.3)",
        "border-danger-secondary": "#c00f0c",
        lightcoral: "#ff6480",
        "text-danger-on-danger": "#fee9e7",
      },
      spacing: {
        "space-200": "8px",
        "padding-sm": "8px",
        "space-300": "12px",
        "scale-03": "16px",
      },
      fontFamily: {
        "m-16": "Roboto",
        aldrich: "Aldrich",
        poppins: "Poppins",
        "body-strong": "Inter",
      },
      borderRadius: {
        "21xl": "40px",
        "81xl": "100px",
        "11xs-3": "1.3px",
        "10xs-7": "2.7px",
        "9980xl": "9999px",
        "13xl": "32px",
        "corner-small": "8px",
        "radius-full": "9999px",
        "radius-200": "8px",
      },
    },
    fontSize: {
      base: "16px",
      sm: "14px",
      xl: "20px",
      mini: "15px",
      "3xs": "10px",
      xs: "12px",
      "13xl": "32px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
