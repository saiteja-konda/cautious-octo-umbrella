import Paperbase from "../../components/Dashboard/Paperbase";
import AdminLogin from "./login";
import { useStoreState, useStoreActions } from "easy-peasy";
const Admin = () => {
  const { admin } = useStoreState((state) => state.vox);
  const { getAdmin } = useStoreActions((state) => state.vox);

  getAdmin();

  if (admin === null || false) {
    return <AdminLogin />;
  } else {
    return <Paperbase />;
  }
};
export default Admin;
