import AdminNavBar from "../../components/AdminNavBar";
import Paperbase from "../../components/Dashboard/Paperbase";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminLogin from "./login";
import { useState } from "react";

const Admin = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const admin = () => {
    if (!isLoggedIn) {
      return <AdminLogin />;
    } else {
      return <Paperbase />;
    }
  };
  const renderAdminArea = admin();
  return <>{renderAdminArea}</>;
};
export default Admin;
