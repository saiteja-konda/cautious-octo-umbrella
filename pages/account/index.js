import { useEffect } from "react";
import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Tabs,
  Toolbar,
  Paper,
  Button,
  makeStyles,
} from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import React from "react";
import PlainBar from "../../components/PlainBar";
import { fetchAPI } from "../../lib/api";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  CakeOutlined,
  DateRangeOutlined,
  EmailOutlined,
  PhoneIphoneOutlined,
} from "@material-ui/icons";
import NotListedLocationOutlinedIcon from "@material-ui/icons/NotListedLocationOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import moment from "moment";

const useStyles = makeStyles({
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
});

function Account({ user, setUser, products, categories }) {
  const { userDetails } = useStoreState((store) => store.vox);
  const { getAddresses } = useStoreActions((store) => store.vox);
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    getAddresses(userDetails.username);
  }, []);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} style={{ height: "100%" }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <PlainBar
        title="Baskin In Nature"
        user={user}
        categories={categories}
        setUser={setUser}
      />
      <Toolbar />
      <div className="container-xl">
        <Paper>
          <div className="row">
            <div className=" mt-5 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div>
                  <img
                    src={
                      userDetails.gender === "FEMALE"
                        ? "https://afmnoco.com/wp-content/uploads/2019/07/74046195_s.jpg"
                        : "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255634-stock-illustration-avatar-icon-male-profile-gray.jpg"
                    }
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      border: "1px solid #2978b5",
                      boxShadow: "2px 2px 30px #b0efeb",
                    }}
                  />
                </div>
              </div>
              <List component="nav">
                <ListItem>
                  <IconButton>
                    <EmailOutlined />
                  </IconButton>
                  <ListItemText primary={userDetails.username} />
                </ListItem>
                <ListItem>
                  <IconButton>
                    <PhoneIphoneOutlined />
                  </IconButton>
                  <ListItemText primary={userDetails.phoneNumber} />
                </ListItem>
                <ListItem>
                  <IconButton>
                    <CakeOutlined />
                  </IconButton>
                  <ListItemText
                    primary={
                      "Birthday " +
                      moment(userDetails.dateOfBirth).format("MMMM D Y")
                    }
                  />
                </ListItem>
                <ListItem>
                  <IconButton>
                    <DateRangeOutlined />
                  </IconButton>
                  <ListItemText
                    primary={`Joined ${moment(userDetails.memberSince)
                      .format("MMMM D dddd Y")
                      .toString()}`}
                  />
                </ListItem>
              </List>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <Paper className="mt-3" elevation={0}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="My Orders" />
                  <Tab label="My Addresses" />
                </Tabs>
                <TabPanel value={value} index={0}>
                  Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {userDetails.addresses?.length === 0 ||
                  userDetails.addresses === null ? (
                    <div
                      style={{
                        padding: "70px 0",
                        // border: "3px solid green",
                        textAlign: "center",
                      }}
                    >
                      You have not added any address yet{" "}
                      <div>
                        <IconButton>
                          <NotListedLocationOutlinedIcon />
                        </IconButton>
                      </div>
                      <div>
                        <button className="btn btn-dark btn-sm mt-3">
                          Add New Address
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {userDetails.addresses.map((o) => (
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                          <Card className={classes.root}>
                            <CardContent>
                              <Typography
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                              >
                                {o.type}
                              </Typography>
                              <Typography variant="h6" component="p">
                                {o.fullName}
                              </Typography>
                              <Typography
                                className={classes.pos}
                                color="textSecondary"
                                variant="subtitle1"
                              >
                                {o.city}
                              </Typography>
                              <Typography variant="body2" component="p">
                                <PhoneOutlinedIcon fontSize="small" />
                                {` ${o.phoneNumber}`}
                              </Typography>
                              <Typography variant="body2" component="p">
                                {`${o.line1}, ${o.line2}, ${o.state}, ${o.zipcode}`}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small">Edit</Button>
                            </CardActions>
                          </Card>
                        </div>
                      ))}
                    </>
                  )}
                </TabPanel>
              </Paper>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const categories = await fetchAPI("/categories");

  return {
    props: {
      categories,
    },
    revalidate: 1,
  };
}
export default Account;
