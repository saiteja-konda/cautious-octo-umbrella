import { IconButton } from "@material-ui/core";
import { DeleteForeverOutlined } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import { useStoreActions } from "easy-peasy";
import React from "react";
const AddressCard = ({ address }) => {
  const { deleteAddress } = useStoreActions((store) => store.vox);
  return (
    <div className="card" style={{ height: "200px", margin: "10px 0px" }}>
      <div className="card-body">
        <div className="row">
          <div className="col-9">
            <div className="card-text">
              <p className="text-secondary">{address.type}</p>
              <h5>{address.fullName}</h5>
              <p>{address.phoneNumber}</p>
              <p>
                {`${address.line1}, ${address.line2}, ${address.state}, ${address.zipcode}`}
              </p>
            </div>
          </div>
          <div className="col-3" style={{ marginTop: "50px" }}>
            <div className="btn mr-1 btn-sm">
              <IconButton>
                <EditIcon />
              </IconButton>
            </div>
            <div className="btn  btn-sm" onClick={() => deleteAddress(address)}>
              <IconButton>
                <DeleteForeverOutlined />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
