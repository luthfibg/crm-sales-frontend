import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: 'dark',
    // primary:{
    //     light:'#df8eda',
    //     main:'#c630c0',
    //     dark:'#9700aa',
    //     contrastText:'#fff'
    // },
    // secondary:{
    //     light:'#f8e855',
    //     main:'#ffcb52',
    //     dark:'#f48f3b',
    //     contrastText:'#000'
    // },
    // background: {
    //     default:'#0f1214',
    //     paper:'rgba(38, 50, 56, 1.0)',
    //     paper2:'rgba(38, 50, 56, 0.4)',
    // },
    // text: {
    //     primary:'#fff',
    //     secondary:'#e0e0e0',
    //     disabled:'#9e9e9e',
    //     contrastText:'#afafaf'
    // }
    primary:{
      light:'#ab4a97',
      main:'#820080',
      dark:'#530066',
      contrastText:'#fff'
    },
    secondary:{
        light:'#b4a411',
        main:'#bb8710',
        dark:'#b04b07',
        contrastText:'#000'
    },
    background: {
        default:'#fefefe',
        paper:'rgba(255, 255, 255, 1.0)',
        paper2:'rgba(222, 222, 222, 0.6)',
    },
    text: {
        primary:'#000',
        secondary:'#303030',
        disabled:'#333',
        contrastText:'#afafaf'
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
