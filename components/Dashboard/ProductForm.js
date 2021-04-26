import React, { useContext, useEffect, useState } from "react";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddProduct from "./AddProduct";
import { useStoreActions, useStoreState } from "easy-peasy";
import EditProduct from "./EditProduct";
import { EditorContext } from "../../lib/context/EditorContext";
const drawerWidth = 1015;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  button1: {
    backgroundColor: "white",
    color: "black",
    margin: "8px",
  },
  button2: {
    backgroundColor: "black",
    color: "white",
    margin: "8px",
  },
}));

export default function ProductForm() {
  const { categories, product, tempUrl } = useStoreState((state) => state.vox);
  const { getCategories, getProducts, getProduct, setUrl } = useStoreActions(
    (state) => state.vox
  );

  const newArray = categories.map((item) => {
    return { value: item.id, label: item.name };
  });
  const refinedArray = newArray.filter((o) => o.value.length > 0);

  const { openthis, setOpenthis, component, setComponent } = useContext(
    EditorContext
  );
  const componentSwitch = () => {
    switch (component) {
      case "Add":
        return (
          <AddProduct getProducts={getProducts} categories={refinedArray} />
        );
      case "Edit":
        return (
          <EditProduct
            getProducts={getProducts}
            categories={refinedArray}
            getProduct={getProduct}
            product={product}
            tempUrl={tempUrl}
            setUrl={setUrl}
          />
        );
      default:
        return "";
    }
  };

  const switchComponent = componentSwitch();

  const classes = useStyles();
  let theme = createMuiTheme({
    palette: {
      primary: {
        light: "#63ccff",
        main: "#009be5",
        dark: "#006db3",
      },
    },
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
        color: "#000",
      },
    },
  });

  theme = {
    ...theme,
    overrides: {
      MUIRichTextEditor: {
        editor: {
          height: "250px",
          maxHeight: "100vh",
          overflow: "auto",
          border: "1px solid #d3d3d3",
          borderRadius: "4px",
          padding: "10px",
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={openthis}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => setOpenthis(!openthis)}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon color="error" />
              ) : (
                <ChevronRightIcon color="error" />
              )}
            </IconButton>
          </div>
          <Divider />
          <>{switchComponent}</>
        </Drawer>
      </div>
    </ThemeProvider>
  );
}
