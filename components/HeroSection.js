import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Button,
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  // This group of buttons will be aligned to the right

  button: {
    textTransform: "none",
    color: "black",
    backgroundColor: "white",
    margin: "5px",
  },
});

const theme = createMuiTheme();

theme.typography.h1 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

function HeroSection() {
  const classes = useStyles();

  var images = [
    "https://source.unsplash.com/random",
    "https://loremflickr.com/1920/1080",
    "https://picsum.photos/1920/1080",
  ];

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        color: "white",
      }}
    >
      <Carousel indicators={false} animation="slide">
        {images.map((item, i) => (
          <img
            style={{ height: "660px", width: "100%", objectFit: "cover" }}
            key={i}
            src={item}
          />
        ))}
      </Carousel>
      <ThemeProvider theme={theme}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Typography variant="h1" component="h1">
            The care you've always needed
          </Typography>
          <Button variant="outlined" className={classes.button}>
            SHOP NOW
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default HeroSection;
