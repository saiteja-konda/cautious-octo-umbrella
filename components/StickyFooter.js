import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

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

  return (
    <div className={classes.root} style={{ marginTop: "400px" }}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="lg">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <Typography variant="h4" component="h1" gutterBottom>
              Bask In Nature
            </Typography>
            {/* <ul
              className="text-left"
              style={{
                textAlign: "left",
                listStyle: "none",
                display: "flex",
                justifyContent:"flex-start"
              }}
            >
              <li className="ml-2">About</li>
              <li className="ml-2">Contact</li>
              <li className="ml-2">Feedback</li>
            </ul> */}
            <p>About</p> <p>Contact</p> <p>Feedback</p>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <Typography variant="h4" component="h1" gutterBottom>
              Follow us
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Facebook
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Instagram
            </Typography>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 ">
            <Typography variant="h4" component="h1" gutterBottom>
              Newsletter
            </Typography>
            <form className="form-group">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                {" "}
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                />
              </div>
            </form>
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
