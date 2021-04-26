import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import { IconButton } from "@material-ui/core";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://baskinnature.com/">
        Baskinnature.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    // backgroundColor:
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[200]
    //     : theme.palette.grey[800],
    backgroundColor: "#f4fafb",
  },
}));

export default function StickyFooter() {
  const classes = useStyles();
  const pimages = [
    {
      img:
        "https://res.cloudinary.com/saiteja/image/upload/v1617990450/bondi_media/icons8-mastercard-50_l8cuua.png",
    },
    {
      img:
        "https://res.cloudinary.com/saiteja/image/upload/v1617990450/bondi_media/icons8-visa-50_sipt0b.png",
    },
    {
      img:
        "https://res.cloudinary.com/saiteja/image/upload/v1617990450/bondi_media/icons8-phone-pe-50_k114ac.png",
    },
    {
      img:
        "https://res.cloudinary.com/saiteja/image/upload/v1617990450/bondi_media/icons8-bhim-upi-50_zrwqoq.png",
    },
  ];
  return (
    <div className={classes.root} style={{ marginTop: "400px" }}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="lg">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <Typography variant="h6" component="h1" gutterBottom>
              Bask In Nature
            </Typography>
            <p>About</p> <p>Contact</p> <p>Feedback</p>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <Typography variant="h6" component="h1" gutterBottom>
              Follow us
            </Typography>
            <IconButton>
              <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton>
              <InstagramIcon fontSize="large" />
            </IconButton>
            <IconButton>
              <TwitterIcon fontSize="large" />
            </IconButton>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 ">
            <Typography variant="h6" component="h1" gutterBottom>
              We Accept
            </Typography>
            {pimages?.map((image, index) => (
              <img key={index} src={image.img} />
            ))}
          </div>
        </div>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            {/* Copyright reserved © Baskinnature.com 2021. */}
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
