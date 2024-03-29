const OnTourColors = {
  // Specify custom property
  roundness: 2,
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
      dark6: "#000000",
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
    }
  },
  colors: {
    primary: "rgb(75, 83, 188)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(224, 224, 255)",
    onPrimaryContainer: "rgb(0, 0, 110)",
    secondary: "rgb(92, 93, 114)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(225, 224, 249)",
    onSecondaryContainer: "rgb(25, 26, 44)",
    tertiary: "rgb(120, 83, 107)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 216, 238)",
    onTertiaryContainer: "rgb(46, 17, 38)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 255, 255)",
    onBackground: "rgb(27, 27, 31)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(27, 27, 31)",
    surfaceVariant: "rgb(228, 225, 236)",
    onSurfaceVariant: "rgb(70, 70, 79)",
    outline: "rgb(119, 118, 128)",
    outlineVariant: "rgb(199, 197, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(243, 239, 244)",
    inversePrimary: "rgb(191, 194, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(246, 243, 252)",
      level2: "rgb(241, 238, 250)",
      level3: "rgb(235, 233, 248)",
      level4: "rgb(233, 231, 247)",
      level5: "rgb(230, 228, 246)",
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(48, 48, 56, 0.4)",
  },

  // fonts
  fonts: {
    regular: {
      fontFamily: "Inter-Regular",
      fontWeight: "normal",
      fontSize: 16,
    },
    medium: {
      fontFamily: "Inter-Medium",
      fontWeight: "normal",
      fontSize: 16,
    },
    light: {
      fontFamily: "Inter-Light",
      fontWeight: "normal",
      fontSize: 16,
    },
    thin: {
      fontFamily: "Inter-Thin",
      fontWeight: "normal",
      fontSize: 16,
    },
  },
};

export default OnTourColors;
