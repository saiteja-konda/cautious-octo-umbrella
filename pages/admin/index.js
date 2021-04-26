import Paperbase from "../../components/Dashboard/Paperbase";
import AdminLogin from "./login";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from "@material-ui/core";

const Admin = () => {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      backgroundColor: "#000",
    },
  }));

  function ShowBackDrop() {
    const classes = useStyles();
    return (
      <div>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    setAdmin(localStorage.getItem("KEY_ID"));
  });

  let Dashboard = () => {
    if (admin === process.env.NEXT_PUBLIC_KEY_SECRET) {
      return <Paperbase />;
    } else {
      return <AdminLogin />;
    }
  };
  const RenderDashboard = Dashboard();

  return <>{RenderDashboard}</>;
};
export default Admin;
