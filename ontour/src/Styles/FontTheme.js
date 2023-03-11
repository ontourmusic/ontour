import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// const theme = createTheme({
//     components: {
//       MuiTypography: {
//         defaultProps: {
//           variantMapping: {
//             h1: 'h2',
//             h2: 'h2',
//             h3: 'h2',
//             h4: 'h2',
//             h5: 'h2',
//             h6: 'h2',
//             subtitle1: 'h2',
//             subtitle2: 'h2',
//             body1: 'span',
//             body2: 'span',
//           },
//         },
//       },
//     },
//   });

const theme = createTheme({
    pallette: {
        primary: {
            main: '#000000',
        },
    },
    typography: {
        fontFamily: ['sans-serif', 'Manrope'].join(','),
    },
});

export default theme;
  