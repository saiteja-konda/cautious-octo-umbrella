import { Button, createMuiTheme, Typography } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import React from "react";

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

function Hero() {
  const classes = useStyles();

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        color: "white",
      }}
    >
      <img
        style={{ height: "660px", width: "100%", objectFit: "cover" }}
        src="https://res.cloudinary.com/saiteja/image/upload/v1617876518/bondi_media/chalo-garcia-rrpOLKrkqV8-unsplash_vrait7.jpg"
      />
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
      {/* The care you've always needed A RANGE OF PRODUCTS FOR YOU Shop now  */}
    </div>
  );
}

export default Hero;
