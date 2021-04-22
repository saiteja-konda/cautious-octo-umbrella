import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";

import { TextField } from "material-ui-formik-components/TextField";
import { Select } from "material-ui-formik-components/Select";
import { AddressSchema, initialValues } from "./AddressSchema";
import state from "./States";
import { UserContext } from "../../../lib/context/UserContext";

const CreateAddress = ({
  title,
  hr,
  cancelButton,
  setComponent,
  postAddress,
  userDetails,
}) => {
  const handleAddressSubmit = (values, { resetForm }) => {
    const obj = { ...values, username: userDetails.username };
    postAddress(obj);
    setComponent("addresses");
    resetForm({ values: "" });
  };
  const handleCancel = (props) => {
    setComponent("addresses");
    props.resetForm({ values: "" });
  };
  return (
    <div className="container">
      <div className="">
        <b>{title}</b>
        {hr ? <hr /> : ""}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={AddressSchema}
        onSubmit={(values, { resetForm }) =>
          handleAddressSubmit(values, { resetForm }, resetForm)
        }
      >
        {(props) => (
          <Form>
            <div className="d-flex">
              <Field
                required
                size="small"
                variant="outlined"
                name="fullName"
                label="First Name"
                component={TextField}
                className="pr-1"
              />
              <Field
                size="small"
                variant="outlined"
                name="lastName"
                label="Last Name"
                component={TextField}
              />
            </div>
            <div className="d-flex">
              <Field
                required
                size="small"
                variant="outlined"
                name="phoneNumber"
                label="Contact number"
                className="pr-1"
                component={TextField}
              />
              <Field
                required
                size="small"
                variant="outlined"
                name="city"
                label="City"
                component={TextField}
              />
            </div>
            <Field
              required
              size="small"
              variant="outlined"
              name="line1"
              label="Line 1"
              placeholder="Door No, Street"
              component={TextField}
            />
            <Field
              required
              size="small"
              variant="outlined"
              name="line2"
              label="Line 2"
              placeholder="Land Mark"
              component={TextField}
            />
            <div className="d-flex">
              <Field
                required
                size="small"
                variant="outlined"
                name="state"
                label="State"
                options={state}
                component={Select}
                className="pr-1"
              />

              <Field
                required
                size="small"
                name="type"
                variant="outlined"
                label="Address Type"
                options={[
                  { value: "HOME", label: "HOME" },
                  { value: "OFFICE", label: "OFFICE" },
                ]}
                component={Select}
                className="pr-1"
              />
              <Field
                required
                size="small"
                variant="outlined"
                name="zipcode"
                label="Pin code"
                component={TextField}
              />
            </div>
            <Field
              required
              size="small"
              variant="outlined"
              name="addressName"
              label="Name this Address"
              component={TextField}
            />
            <div className="">
              <div
                className="d-flex"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <div>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                    }}
                    className="btn btn-sm"
                  >
                    Submit
                  </button>
                </div>
                {cancelButton ? (
                  <div
                    className="btn btn-sm btn-outline-danger ml-2"
                    onClick={() => handleCancel(props)}
                  >
                    cancel
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAddress;
