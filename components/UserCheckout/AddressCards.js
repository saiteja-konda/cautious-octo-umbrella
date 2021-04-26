import _ from "lodash";
import React from "react";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
  Typography,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
  IconButton,
} from "@material-ui/core";
import { useStoreActions } from "easy-peasy";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  mainroot: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.primary,
  },
  listroot: {
    width: "100%",
    // maxWidth: "48ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const AddressCards = ({ items, selectedAddress, onSelect }) => {
  const classes = useStyles();
  const chunks = _.chunk(items, 2);
  const { deleteAddress } = useStoreActions((store) => store.vox);

  function FormRow() {
    return (
      <React.Fragment>
        {chunks.map((el) =>
          el.map((address) => (
            <Grid item xs={12} sm={6} className="mt-2">
              <Paper
                // elevation={selectedAddress.id === address.id ? 5 : 0}
                elevation={0}
                className={classes.paper}
              >
                <Card elevation={0} className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h4">
                        {address.type}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {`${address.fullName}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {`${address.phoneNumber}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {`${address.line1}, ${address.line2}`}{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {`${address.state},${" "}${address.city},${" "}${
                          address.zipcode
                        }`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      variant={
                        selectedAddress.id === address.id
                          ? `contained`
                          : "outlined"
                      }
                      color="primary"
                      onClick={() => onSelect(address)}
                    >
                      Delivery to this
                    </Button>
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => deleteAddress(address)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))
        )}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
};

export default AddressCards;
