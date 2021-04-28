import React from "react";
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
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";

const styles = (theme) => ({
  paper: {
    // maxWidth: 936,
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

function ProductTableHeader(props) {
  const {
    classes,
    setComponent,
    setOpenthis,
    string,
    setString,
    setLoading,
    getProducts,
    handleSearch,
  } = props;

  const handleReload = async () => {
    setLoading(true);
    getProducts();
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <main>
      <Paper className={classes.paper}>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  value={string}
                  onChange={(e) => {
                    setString(e.target.value);
                    handleSearch();
                  }}
                  placeholder="Search Products by Title"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addUser}
                >
                  Search
                </Button>
                <Tooltip title="Add New Product">
                  <IconButton>
                    <AddCircleTwoToneIcon
                      className={classes.block}
                      color="primary"
                      onClick={() => {
                        setComponent("Add");
                        setOpenthis(true);
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reload">
                  <IconButton onClick={handleReload}>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Paper>
    </main>
  );
}

ProductTableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductTableHeader);
