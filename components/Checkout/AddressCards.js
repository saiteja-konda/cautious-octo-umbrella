import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
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

const AddressCards = ({ items, onSelect, selectedAddress }) => {
  const chunks = _.chunk(items, 2);
  const classes = useStyles();
  function FormRow() {
    return (
      <React.Fragment>
        {chunks.map((el) =>
          el.map((address) => (
            <Grid item xs={12} sm={6} key={address.id} className="mt-2">
              <Paper elevation={0} className={classes.paper}>
                <List className={classes.listroot}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Ali Connors
                          </Typography>
                          {
                            " — I'll be in your neighborhood doing errands this…"
                          }
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <EditIcon/>
                      </IconButton>
                      <IconButton>
                        <DeleteIcon/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          ))
        )}
      </React.Fragment>
    );
  }

  const { deleteAddress } = useStoreActions((store) => store.vox);
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
};

export default AddressCards;





//  <div>
//                   <b>{address.fullName}</b>
//                 </div>
//                 <div>{address.phoneNumber}</div>
//                 <div>{`${address.line1}, ${address.line2}`}</div>
//                 <div>{address.state}</div>
//                 <br />
//                 <div
//                   className="btn-group btn-block mb-0"
//                   role="group"
//                   aria-label="Basic example"
//                 >
//                   <button type="button" className="btn btn-light btn-sm">
//                     Edit
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => deleteAddress(address)}
//                     className="btn btn-light btn-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//                 <button
//                   className={`btn btn-sm mt-0 btn-${
//                     address.id === selectedAddress.id ? "warning" : "dark"
//                   } btn-block`}
//                   onClick={() => onSelect(address)}
//                 >
//                   Deliver to this address
//                 </button>