import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Button from "@mui/material/Button";

const OnTourTheme = createTheme({
  palette: {
    primary: {
        main: "#ffffff",
    },
    secondary: {
        // Black (the navigation bar color)
        main: "#21252a",
        dark1: "#1a1d21",
        dark2: "#13161a",
        light1: "#2a2e33",
        light2: "#33373d",
        light3: "#3c4046",
    },
    tertiary: {
        // White (the polaroid background color)
        // shades from https://www.color-hex.com/color/fffbff
        main: "#FFFBFF",
        dark1: "#E5E1E5",
        dark2: "#ccc8cc",
        dark3: "#b2afb2",
        dark4: "#999699",
        dark5: "#7f7d7f",
    },
    star: {
        // Gold (the rating star color)
        main: "#faaf00",
        dark1: "#e5a000",
        dark2: "#cc8f00",
        light1: "#ffbb00",
        light2: "#ffcc00",
        light3: "#ffdd00",
    },
    accent: {
        // Red (on tour icon color)
        main: "#ff0000",
        dark1: "#e50000",
        dark2: "#cc0000",
        dark3: "#b20000",
        dark4: "#990000",
        dark5: "#7f0000",
    },
    button: {
        dark: "#212529",
        darkDisabled: "#707275",
        hover: "ACACAF",
    }
  },
});

export default OnTourTheme;

// export default function Palette() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Button>Primary</Button>
//       <Button color="secondary">Secondary</Button>
//     </ThemeProvider>
//   );
// }
