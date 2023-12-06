/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    daisyui: {
      themes: ["light"]
    },
    extend: {
      backgroundColor: {
        main: '#fad849',
        danger: '#f21515'
      },
      borderColor: {
        main: '#fad849'
      },
      colors: {
        main: '#fad849'
      },
      animation: {
        'pulse': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        }
      },
      extend: {
        display: ["group-hover"],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}

