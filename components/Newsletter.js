import {
  Button,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "600px",
    backgroundColor: "#f4fafb",
  },
  image: {
    backgroundImage:
      "url(https://res.cloudinary.com/saiteja/image/upload/v1617941924/bondi_media/ben-rosett-RBouLnm0L0Q-unsplash_tjwm90.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "600px",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "600px",
  },
  button: {
    textTransform: "none",
    backgroundColor: "black",
    color: "#d3d3d3",
  },
}));

function Newsletter() {
  const classes = useStyles();

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        {/* <TransBar title="Baskin In Nature" /> */}
        <CssBaseline />
        <Grid
          item
          xs={12}
          className={classes.root}
          sm={8}
          md={5}
          component={Paper}
          elevation={0}
          square
        >
          <div
            className={classes.paper}
            style={{
              marginTop: "150px",
            }}
          >
            <div
              className="container"
              className="container"
              style={{ width: "300px" }}
              // onSubmit={handleSignUp}
            >
              <form className="form-signin">
                <Typography
                  variant="h6"
                  component="h3"
                  className="text-center mb-4  form-signin-heading"
                >
                  JOIN US FOR FREE TO GET INSTANT EMAIL UPDATES!
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  className="text-center mb-4 mt-0 form-signin-heading"
                >
                  Subscribe and get notified at first on the latest update and
                  offers!
                </Typography>
                <input
                  type="text"
                  className="form-control mb-4"
                  name="email"
                  placeholder="Your email here"
                  // value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="form-control mb-4"
                  name="fullName"
                  placeholder="Your full name"
                  // value={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                />

                <Button
                  className={classes.button}
                  fullWidth size="large"
                  type="submit"
                >
                  Sign up
                </Button>
              </form>
            </div>
          </div>
        </Grid>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Grid>
    </div>
  );
}

export default Newsletter;
