import { createTheme } from '@material-ui/core';

const theme = createTheme({
  root: {
    borderRadius: '12px',
    buttonPadding: '6px 12px 6px 12px',
    borderThickness: '3px',
    containerHeight: '500px'
  },
  mediumFont: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '18px'
  },
  palette: {
    gradient: {
      pink: 'linear-gradient(270deg, #4CC9F0 0%, #4895EF 11%, #4790EF 20.77%, #4361EE 30.25%, #3F37C9 38.56%, #3A0CA3 52.27%, #480CA8 59.27%, #560BAD 69.77%, #7209B7 78.67%, #B5179E 89.17%, #F72585 100%)'
    },
    royalBlue: {
      main: '#051c3f'
    },
    flickrPink: {
      main: '#f72585'
    },
    byzantine: {
      main: '#b5179e'
    },
    purple: {
      main: '#7209b7',
      dark: '#560bad'
    },
    trypanBlue: {
      main: '#480ca8',
      dark: '#3a0ca3'
    },
    persianBlue: {
      main: '#3f37c9'
    },
    ultramarineBlue: {
      main: '#4361ee'
    },
    dodgerBlue: {
      main: '#4895ef'
    },
    skyBlue: {
      main: '#4cc9f0'
    },
    smokyWhite: {
      main: '#f5f5f5'
    },
    error: {
      main: '#FB4831',
      light: '#F85743'
    },
    grey: {
      grey100: '#808080',
      grey80: '#999999',
      grey60: '#B3B3B3',
      grey40: '#CCCCCC',
      grey20: '#E6E6E6'
    },
    summary: {
      red: '#FF5742',
      green: '#00954F',
      'light-blue': '#00C1F3',
      'dark-blue': '#006FBA'
    }
  }
});

export default theme;
