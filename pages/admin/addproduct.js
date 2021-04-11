import React, { useState } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { baseUrl } from "../../utils/urlConfig";
import { useStoreState } from "easy-peasy";

function AddProduct() {
  const hiddenFileInput = React.useRef(null);
  const [url, setUrl] = useState(null);
  const [media, setMedia] = useState("");
  const router = useRouter();
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stockInUnits, setstockInUnits] = useState(0);
  const [q1, setQ1] = useState({ lable: null, price: null });
  const [q2, setQ2] = useState({ lable: null, price: null });
  const [q3, setQ3] = useState({ lable: null, price: null });
  const [q4, setQ4] = useState({ lable: null, price: null });
  const { categories } = useStoreState((state) => state.vox);

  const test = [
    { label: q1.lable, price: q1.price },
    { label: q2.lable, price: q2.price },
    { label: q3.lable, price: q3.price },
    { label: q4.lable, price: q4.price },
  ];

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

  const handleClick = async (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
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

  const handProductSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${baseUrl}/products`, {
          title,
          description,
          categoryId: category,
          price,
          stockInUnits,
          image: await imageUpload(),
          list: {
            title: "size",
            options: JSON.stringify(test),
          },
        })
        .then((res) => console.log(res.data))
        .then(() => router.push("/admin/products"));
    } catch (erorr) {
      console.log();
    } finally {
    }
  };

  const Dummy = () => {
    if (previewSource === null) {
      return (
        <img
          onClick={handleClick}
          src="https://lh3.googleusercontent.com/APENohQzs7YdTuY6fVUgptT7FLwCVqKj26oMNaeI-QuZefFQydgYtyt0Mes798DOVhuUKMIQKtL3Ic8ffQL6dBvB-Q=s2048"
          style={{
            height: "300px",
            backgroundColor: "#606060FF",
            width: "100%",
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
              height: "300px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      );
    }
  };

  const renderDummy = Dummy();
  return (
    <div
      style={{
        height: "100vh",
        color: "#fff",
        // backgroundColor: "#00203FFF",
      }}
    >
      <AdminNavBar />

      <div className="container  p-5 " style={{ color: "#00203FFF" }}>
        <h5 className="mb-4">Add Product</h5>
        <form onSubmit={handProductSubmit}>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  style={{ height: "100px" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex" }}>
                <div className="form-group">
                  {/* <label>Price </label>
                  <input
                    className="form-control mr-3 "
                    style={{ width: "50%" }}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  /> */}
                </div>
                <div className="form-group">
                  <label> Units In Stock </label>
                  <input
                    className="form-control"
                    style={{ width: "50%" }}
                    value={stockInUnits}
                    onChange={(e) => setstockInUnits(e.target.value)}
                  />
                </div>
              </div>

              <h6 className="form-group">Sizes</h6>
              <div className="d-flex">
                <br />
                <div className="form-group">
                  <label>Quanity 1</label>
                  <input
                    className="form-control"
                    style={{ width: "50%" }}
                    value={q1.lable}
                    onChange={(e) => setQ1({ ...q1, lable: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    className="form-control"
                    style={{ width: "50%" }}
                    value={q1.price}
                    onChange={(e) => setQ1({ ...q1, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="d-flex">
                <br />
                <div className="form-group">
                  <label>Quanity</label>
                  <input
                    className="form-control"
                    style={{ width: "50%" }}
                    value={q2.lable}
                    onChange={(e) => setQ2({ ...q2, lable: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    className="form-control"
                    style={{ width: "50%" }}
                    value={q2.price}
                    onChange={(e) => setQ2({ ...q2, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="d-flex">
                <br />
                <div className="form-group">
                  <label>Quanity</label>
                  <input
                    className="form-control"
                    style={{ width: "50%" }}
                    value={q3.lable}
                    onChange={(e) => setQ3({ ...q3, lable: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    className="form-control"
                    style={{ width: "50%" }}
                    value={q3.price}
                    onChange={(e) => setQ3({ ...q3, price: e.target.value })}
                  />
                </div>
              </div>
              <div className="d-flex">
                <br />
                <div className="form-group">
                  <label>Quanity</label>
                  <input
                    className="form-control"
                    style={{ width: "50%" }}
                    value={q4.lable}
                    onChange={(e) => setQ4({ ...q4, lable: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    className="form-control"
                    style={{ width: "50%" }}
                    value={q4.price}
                    onChange={(e) => setQ4({ ...q4, price: e.target.value })}
                  />
                  
                </div>
              </div>
            </div>
            <div className="col">
              {renderDummy}
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
                }}
                accept="image/*"
              />
              <button
                className="btn btn-sm btn-block  mt-3"
                style={{
                  backgroundColor: "#ADEFD1FF",
                  color: "#00203FFF",
                }}
                onClick={handleClick}
              >
                Select Image
              </button>
            </div>
          </div>

          <div className="d-flex mt-2">
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
            <Link
              style={{ color: "#fff" }}
              className="nav-link"
              href="/admin/products"
            >
              <div
                className="btn ml-2"
                style={{
                  backgroundColor: "red",
                  color: "#fff",
                }}
              >
                cancel
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
