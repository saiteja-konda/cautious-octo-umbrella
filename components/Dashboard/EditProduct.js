import React, { useState, useRef, useEffect } from "react";
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

function EditProduct({
  handleCloseEdit,
  categories,
  getProducts,
  getProduct,
  product,
  tempUrl,
  setUrl,
}) {
  const formRef = useRef();

  const hiddenFileInput = React.useRef(null);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [imageChanged, setImageChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [dvalue, setDvalue] = useState(product.description);
  const [publish, setPublish] = useState(product.published);

  const override = css`
    display: block;
    margin: 0 auto;
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
    setImageChanged(true);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("something went wrong!");
    };
  };
  useEffect(() => {
    setUrl(product.image);
  }, []);
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
      .typeError("You must specify a number"),
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
          src={product.image}
          style={{
            height: "150px",
            backgroundColor: "#606060FF",
            width: "150px",
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
              height: "150px",
              width: "150px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </div>
      );
    }
  };

  const renderDummy = Dummy();

  const temp = JSON.parse(product.list.options);
  const temp1 = JSON.parse(product.types.options);

  const ExtractedTypes = temp1.map((o) => o);
  const ExtractedOpts = temp.map((o) => o);

  const initialValues = {
    title: product.title,
    categoryId: product.categoryId,
    stockInUnits: product.stockInUnits,

    q1: ExtractedOpts[0].label,
    p1: ExtractedOpts[0].price,

    q2: ExtractedOpts[1].label,
    p2: ExtractedOpts[1].price,

    q3: ExtractedOpts[2].label,
    p3: ExtractedOpts[2].price,

    q4: ExtractedOpts[3].label,
    p4: ExtractedOpts[3].price,

    option1: ExtractedTypes[0].label,
    option2: ExtractedTypes[1].label,
    option3: ExtractedTypes[2].label,
    option4: ExtractedTypes[3].label,
  };
  const handProductSubmit = async (values, { resetForm }) => {
    let changedObject = {
      title: values.title,
      description: dvalue,
      published: publish,
      categoryId: values.categoryId,
      stockInUnits: values.stockInUnits,
      image: await imageUpload(),
      list: {
        title: "size",
        options: JSON.stringify([
          {
            label: values.q1,
            price: values.p1,
          },
          {
            label: values.q2,
            price: values.p2,
          },
          {
            label: values.q3,
            price: values.p3,
          },
          {
            label: values.q4,
            price: values.p4,
          },
        ]),
      },
      types: {
        options: JSON.stringify([
          {
            label: values.option1,
            value: values.option1,
          },
          {
            label: values.option2,
            value: values.option2,
          },
          {
            label: values.option3,
            value: values.option3,
          },
          {
            label: values.option4,
            value: values.option4,
          },
        ]),
      },
    };
    let unChangedObject = {
      title: values.title,
      description: dvalue,
      categoryId: values.categoryId,
      stockInUnits: values.stockInUnits,
      published: publish,
      image: product.image,
      list: {
        title: "size",
        options: JSON.stringify([
          {
            label: values.q1,
            price: values.p1,
          },
          {
            label: values.q2,
            price: values.p2,
          },
          {
            label: values.q3,
            price: values.p3,
          },
          {
            label: values.q4,
            price: values.p4,
          },
        ]),
      },
      types: {
        options: JSON.stringify([
          {
            label: values.option1,
            value: values.option1,
          },
          {
            label: values.option2,
            value: values.option2,
          },
          {
            label: values.option3,
            value: values.option3,
          },
          {
            label: values.option4,
            value: values.option4,
          },
        ]),
      },
    };

    if (imageChanged) {
      try {
        axios
          .put(`${baseUrl}/products/${product.id}`, changedObject)
          // .then((res) => console.log(res.data))
          .then(() => {
            getProducts(), setLoading(false), handleCloseEdit(), setDvalue("");
            setPreviewSource(
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-LIuw85eKZxCJ2cIWs0bAmdWbdlMbPBtoKR6PLl8VjMUelxkCEtB7IHm9j4Vy_xEYAr4&usqp=CAU"
            );
            resetForm({ values: "" });
          });
      } catch (erorr) {}
    } else {
      try {
        axios
          .put(`${baseUrl}/products/${product.id}`, unChangedObject)
          // .then((res) => console.log(res.data))
          .then(() => {
            getProducts(), setLoading(false), handleCloseEdit(), setDvalue("");
            setPreviewSource(
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-LIuw85eKZxCJ2cIWs0bAmdWbdlMbPBtoKR6PLl8VjMUelxkCEtB7IHm9j4Vy_xEYAr4&usqp=CAU"
            );
            resetForm({ values: "" });
          });
      } catch (erorr) {}
    }
  };

  return (
    <div style={{ height: "120%" }}>
      <BarLoader
        color="red"
        loading={isLoading}
        height={4}
        width={800}
        css={override}
        size={400}
      />
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
                          onClick={handleCloseEdit}
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

export default EditProduct;
