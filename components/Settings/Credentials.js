import { Typography } from "@material-ui/core";
import React from "react";

// const { site } = useStoreState((state) => state.vox);
// const { siteUpdate } = useStoreActions((state) => state.vox);
// const [value, setValue] = useState(site.aboutus);

// const handleContentChange = (value) => {
//   setValue(value);
// };
// const handleSubmit = () => {
//   siteUpdate({ ...site, aboutus: value });
// };

function Credentials() {
  return (
    <div className="container">
      <Typography
        variant="subtitle1"
        color="primary"
        className="mt-5 text-center"
      >
        Credentials
      </Typography>
      <form className="container-xs" style={{ margin: "0 30%" }}>
        <div className="form-group">
          <label for="exampleInputEmail1">User Name</label>
          <input className="form-control" placeholder="User Name" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Credentials;
