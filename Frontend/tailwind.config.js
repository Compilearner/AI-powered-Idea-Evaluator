/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./Authentication/**/*.{js,ts,jsx,tsx}", 
    "./Components/**/*.{js,ts,jsx,tsx}", 
    "./InputDashboard/**/*.{js,ts,jsx,tsx}", 
  ],  
  theme: {
    extend: {

      screens : {
        'tallest' : {
          'raw' : '(min-height:1170px)'
        },
        'tall': {
          'raw' : '(min-height: 800px)'
        }, 
        'short': {
          'raw' : '(max-height: 800px)'
        },
        'max-lg': { 'max': "1000px"},
        'min-lg' : {'min': '1000px'},
        'max-small' : {'max' : '590px'},
        'min900' : {'min' : '900px'},
        'min500' : {'min': '500px'},
        'max500' : {'max': '500px'},
        'max768' : {'max' : '768px'},
        'max640' : {'max': "640px"},
      }

    },
  },
  plugins: [],
}

