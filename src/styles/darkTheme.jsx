import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:{
        light:'#df8eda',
        main:'#c630c0',
        dark:'#9700aa',
        contrastText:'#fff'
    },
    secondary:{
        light:'#f8e855',
        main:'#ffcb52',
        dark:'#f48f3b',
        contrastText:'#000'
    },
    background: {
        default:'#0f1214',
        paper:'#263238',
    },
    text: {
        primary:'#fff',
        secondary:'#e0e0e0',
        disabled:'#9e9e9e',
    }
  },
  typography: {
    allVariants: {
        resize: 'none',
        textDecorationLine:'none',
    }
  },
  transitions: {
    duration:'0.6s',
  }
});

export default darkTheme;
