import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import { StoreProvider, useStoreActions, useStoreState } from "easy-peasy";
import AddIcon from "@material-ui/icons/Add";

import _ from "lodash";
import { CardHeader, Fab } from "@material-ui/core";
import { store0 } from "../../data/store";
import ImageUploader from "../../utils/ImageUploader";
import { WidgetLoader } from "react-cloudinary-upload-widget";

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: "#eaeff1",
  },
});

function Carousel(props) {
  const { classes } = props;
  const { Promos } = useStoreState((store) => store.rox);
  const { getPromos, getNewPromo } = useStoreActions((store) => store.rox);

  useEffect(() => getPromos(), []);

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <CardHeader title="Promotion Banners" />
          </Grid>
          <Grid container spacing={1}>
            {Promos.map((o) => (
              <Grid item xs={6}>
                <Paper elevation={12}>
                  <img src={o.url} style={{ width: "100%" }} />
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Typography color="textSecondary" align="center" className="mr-2">
              Add New Image{" "}
            </Typography>
            <ImageUploader getNewPromo={getNewPromo} />
            <WidgetLoader />
            <Fab color="primary">
              <AddIcon />
            </Fab>
          </Grid>
        </div>
      </Paper>
    </main>
  );
}

Carousel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Carousel);
