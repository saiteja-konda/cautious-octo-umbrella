import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DescriptionIcon from "@material-ui/icons/Description";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import InfoIcon from "@material-ui/icons/Info";
import GavelIcon from "@material-ui/icons/Gavel";
import RefreshIcon from "@material-ui/icons/Refresh";
import SecurityIcon from "@material-ui/icons/Security";
import FaceIcon from "@material-ui/icons/Face";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { DashboardContext } from "../../lib/context/DashboardContext";
import Link from "next/link";
const categories = [
  {
    id: "Shop",
    children: [
      { id: "Products", icon: <StorefrontIcon />, active: true },
      { id: "Orders", icon: <ListAltIcon /> },
    ],
  },
  {
    id: "Blog",
    children: [
      { id: "Articles", icon: <DescriptionIcon /> },
      { id: "Newsletter", icon: <AnnouncementIcon /> },
    ],
  },
  {
    id: "Promotions",
    children: [
      { id: "Banners", icon: <ViewCarouselIcon />, active: true },
      { id: "Referees", icon: <FaceIcon /> },
      { id: "Testmonials", icon: <FavoriteIcon /> },
    ],
  },
  {
    id: "Setting",
    children: [
      { id: "About", icon: <InfoIcon /> },
      { id: "Terms and conditions", icon: <GavelIcon /> },
      { id: "Return Policy", icon: <RefreshIcon /> },
      { id: "Change Credntials", icon: <SecurityIcon /> },
    ],
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: "#4fc3f7",
  },
  itemPrimary: {
    fontSize: "inherit",
    cursor: "pointer",
    textDecoration: "none",
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const { classes, ...other } = props;
  const { setComponent, component } = useContext(DashboardContext);

  const handleChoice = (id) => {
    setComponent(id);
  };
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          Bask In Nature
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            <Link style={{ textDecoration: "none" }} href="/">
              Go to Site
            </Link>
          </ListItemText>
        </ListItem>
        {categories?.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children?.map(({ id: childId, icon, active }) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, childId === component ? classes.itemActiveItem : "")}
                onClick={() => handleChoice(childId)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
