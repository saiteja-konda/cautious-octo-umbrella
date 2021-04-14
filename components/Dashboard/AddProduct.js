import React, { useState, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/urlConfig";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "material-ui-formik-components/TextField";
import { Select } from "material-ui-formik-components/Select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid, Switch, Typography } from "@material-ui/core";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";

function AddProduct({ handleClose, categories, getProducts }) {
  const formRef = useRef();

  const hiddenFileInput = React.useRef(null);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState(null);
  const [selectedFile, setSelectedFile] = useState();

  const [isLoading, setLoading] = useState(false);

  const [publish, setPublish] = useState(true);

  const [dvalue, setDvalue] = useState(null);
  const override = css`
    display: block;
    // margin: 0 auto;
    border-color: red;
    // left: 100%;
    width: "400px";
  `;
  const handleDesc = (value) => {
    setDvalue(value);
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleClick = async (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };
  const note = (string) => {
    toast.error(string, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "bondi_la_fleur");
    data.append("cloud_name", "saiteja");
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/saiteja/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    // console.log(res2);
    return res2.url;
  };

  const validationSchema = Yup.object({
    title: Yup.string("Enter Product Name")
      .required("Product Name is required")
      .max(40),
    stockInUnits: Yup.number()
      .positive("Stock can't be negitive")
      .required("Enter Product Stock Avaliblility")
      .max(500),
    categoryId: Yup.number("Select Product category").required(
      "Select Product category"
    ),
    q1: Yup.string().required("Enter Quantity label"),
    q2: Yup.string().nullable(),
    q3: Yup.string().nullable(),
    q4: Yup.string().nullable(),
    p1: Yup.number()
      .positive("Price must be a positive number")
      .required("Enter price for this quantity")
      .typeError("You must specify a number")
      .nullable(),
    p2: Yup.number()
      .positive("Price must be a positive number")
      .typeError("You must specify a number")
      .nullable(),
    p3: Yup.number()
      .positive("Price must be a positive number")
      .typeError("You must specify a number")
      .nullable(),
    p4: Yup.number()
      .positive("Price must be a positive number")
      .typeError("You must specify a number")
      .nullable(),
  });

  const Dummy = () => {
    if (previewSource === null) {
      return (
        <img
          onClick={handleClick}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-LIuw85eKZxCJ2cIWs0bAmdWbdlMbPBtoKR6PLl8VjMUelxkCEtB7IHm9j4Vy_xEYAr4&usqp=CAU"
          style={{
            height: "350px",
            backgroundColor: "#606060FF",
            width: "300px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      );
    } else {
      return (
        <div>
          <img
            src={previewSource}
            alt="chosen"
            style={{
              height: "350px",
              width: "300px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </div>
      );
    }
  };

  const renderDummy = Dummy();
  const handProductSubmit = async (values, { resetForm }) => {
    if (previewSource != null && dvalue != null && values.categoryId != null) {
      setLoading(true);
      try {
        axios
          .post(`${baseUrl}/products`, {
            title: formRef.current.values.title,
            description: dvalue,
            published: publish,
            categoryId: formRef.current.values.categoryId,
            stockInUnits: formRef.current.values.stockInUnits,
            image: await imageUpload(),
            list: {
              title: "size",
              options: JSON.stringify([
                {
                  label: formRef.current.values.q1,
                  price: formRef.current.values.p1,
                },
                {
                  label: formRef.current.values.q2,
                  price: formRef.current.values.p2,
                },
                {
                  label: formRef.current.values.q3,
                  price: formRef.current.values.p3,
                },
                {
                  label: formRef.current.values.q4,
                  price: formRef.current.values.p4,
                },
              ]),
            },
            types: {
              options: JSON.stringify([
                {
                  label: formRef.current.values.option1,
                  value: formRef.current.values.option1,
                },
                {
                  label: formRef.current.values.option2,
                  value: formRef.current.values.option2,
                },
                {
                  label: formRef.current.values.option3,
                  value: formRef.current.values.option3,
                },
                {
                  label: formRef.current.values.option4,
                  value: formRef.current.values.option4,
                },
              ]),
            },
          })
          // .then((res) => console.log(res.data))
          .then(() => {
            getProducts(),
              setLoading(false),
              handleClose(),
              setPreviewSource(
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-LIuw85eKZxCJ2cIWs0bAmdWbdlMbPBtoKR6PLl8VjMUelxkCEtB7IHm9j4Vy_xEYAr4&usqp=CAU"
              );
            resetForm({ values: "" });
          });
      } catch (erorr) {
      } finally {
        setDvalue("");
      }
    } else {
      note("You have missed to add Product image or Description");
    }
  };
  const initialValues = {
    title: "",
    categoryId: null,
    stockInUnits: 0,
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    p1: null,
    p2: null,
    p3: null,
    p4: null,
    option1: null,
    option2: null,
    option3: null,
    option4: null,
  };
  return (
    <div style={{ height: "120%" }}>
      <div className="container-xl">
        <div className="row mt-3 mr-1 ml-1">
          <div className="col-6">
            <Typography color="primary" variant="caption">
              Product Details
            </Typography>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) => {
                handProductSubmit(values, { resetForm }, resetForm);
              }}
              validationSchema={validationSchema}
              innerRef={formRef}
            >
              {(props) => (
                <Form>
                  <div className="row">
                    <div className="">
                      <Field
                        required
                        size="small"
                        variant="outlined"
                        name="title"
                        label="Name"
                        component={TextField}
                      />
                      <Field
                        required
                        size="small"
                        variant="outlined"
                        name="categoryId"
                        label="Category"
                        options={categories}
                        component={Select}
                      />
                      <SunEditor
                        onChange={handleDesc}
                        value={dvalue}
                        setOptions={{
                          height: 200,
                          buttonList: [
                            ["font", "fontSize", "formatBlock"],
                            ["bold", "underline", "italic", "strike", "link"],
                            ["undo", "redo"],
                            ["fontColor", "hiliteColor"],
                            ["outdent", "indent"],
                            ["align", "horizontalRule", "list", "table"],
                          ],
                        }}
                      />
                      <Field
                        required
                        size="small"
                        variant="outlined"
                        name="stockInUnits"
                        label="Stock in Units"
                        component={TextField}
                      />
                      <div>
                        <Typography color="primary" variant="caption">
                          Product variants
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <div>
                            <Field
                              required
                              size="small"
                              variant="outlined"
                              name="q1"
                              label="Quantity"
                              component={TextField}
                            />
                          </div>
                          <div>
                            <Field
                              required
                              size="small"
                              variant="outlined"
                              name="p1"
                              label="Price"
                              component={TextField}
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <div>
                            <Field
                              size="small"
                              variant="outlined"
                              name="q2"
                              label="Quantity"
                              component={TextField}
                              style={{ margin: "1px" }}
                            />
                          </div>
                          <div>
                            <Field
                              size="small"
                              variant="outlined"
                              name="p2"
                              label="Price"
                              component={TextField}
                              style={{ margin: "1px" }}
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <div>
                            <Field
                              size="small"
                              variant="outlined"
                              name="q3"
                              label="Quantity"
                              component={TextField}
                              style={{ margin: "1px" }}
                            />
                          </div>
                          <div>
                            <Field
                              size="small"
                              variant="outlined"
                              name="p3"
                              label="Price"
                              component={TextField}
                              style={{ margin: "1px" }}
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <div>
                            <Field
                              size="small"
                              variant="outlined"
                              name="q4"
                              label="Quantity"
                              component={TextField}
                              style={{ margin: "1px" }}
                            />
                          </div>
                          <div>
                            <Field
                              size="small"
                              variant="outlined"
                              name="p4"
                              label="Price"
                              component={TextField}
                              style={{ margin: "1px" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: "20px" }} />
                      <Typography color="primary" variant="caption">
                        Add Options if applicable
                      </Typography>
                      <div className="d-flex">
                        <div className=" mr-4">
                          <Field
                            size="small"
                            variant="outlined"
                            style={{ width: "100px" }}
                            name="option1"
                            label="option"
                            options={categories}
                            component={TextField}
                          />
                        </div>
                        <div className="form-group mr-4">
                          <Field
                            size="small"
                            variant="outlined"
                            style={{ width: "100px" }}
                            name="option2"
                            label="option"
                            options={categories}
                            component={TextField}
                          />
                        </div>
                        <div className="form-group mr-4">
                          <Field
                            size="small"
                            variant="outlined"
                            style={{ width: "100px" }}
                            name="option3"
                            label="option"
                            options={categories}
                            component={TextField}
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            size="small"
                            variant="outlined"
                            style={{ width: "100px" }}
                            name="option4"
                            label="option"
                            options={categories}
                            component={TextField}
                          />
                        </div>
                      </div>
                      <Typography component="div">
                        <Grid
                          component="label"
                          container
                          alignItems="center"
                          spacing={1}
                        >
                          <Grid item>
                            <Typography variant="caption">Publish</Typography>
                          </Grid>
                          <Grid item>
                            <Switch
                              checked={publish}
                              onChange={() =>
                                !publish ? setPublish(true) : setPublish(false)
                              }
                              name="checked"
                              color="primary"
                            />
                          </Grid>
                        </Grid>
                        <Typography color="error" variant="caption">
                          Disable this to save this product as draft
                        </Typography>
                      </Typography>

                      <div style={{ marginTop: "20px" }} />
                      <BarLoader
                        color="#f05945"
                        loading={isLoading}
                        height={4}
                        width={150}
                        css={override}
                        size={400}
                      />
                    </div>
                    <div className=""></div>
                    <div className="">
                      {" "}
                      <div
                        className="d-flex"
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      >
                        <div>
                          <button
                            type="submit"
                            style={{
                              backgroundColor: "#ADEFD1FF",
                              color: "#00203FFF",
                            }}
                            className="btn"
                          >
                            Submit
                          </button>
                        </div>

                        <div
                          className="btn ml-2"
                          style={{
                            backgroundColor: "red",
                            color: "#fff",
                          }}
                          onClick={handleClose}
                        >
                          cancel
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="col-6">
            <div className="col-6">
              <div>{renderDummy}</div>
              <input
                id="fileInput"
                type="file"
                name="image"
                onChange={handleFileInputChange}
                value={fileInputState}
                className="form-input"
                ref={hiddenFileInput}
                style={{
                  display: "none",
                  position: "absolute",
                  marginTop: "55vh",
                }}
                accept="image/*"
                component={TextField}
              />
              <div
                className="btn btn-sm mt-3 mb-3"
                style={{
                  backgroundColor: "#ADEFD1FF",
                  color: "#00203FFF",
                  width: "150px",
                }}
                onClick={handleClick}
              >
                Select Image
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default AddProduct;
