import React from "react";

function ProductHero({ title, image, paragraph }) {
  return (
    <div className="container-xl">
      <div className="col-md-10 m-0 p-0 mb-5" style={{ position: "relative" }}>
        <div
          className="store"
          style={{
            padding: "0px",
            margin: "0px",
            backgroundSize: "contain",
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="d-none d-md-block"
          style={{
            position: "absolute",
            top: "200px",
            right: "-20%",
            backgroundColor: "whitesmoke",
            height: "200px",
            width: "300px",
            padding: "25px",
            margin: "0px",
            boxShadow: "2px 15px 100px #010101",
          }}
        >
          <h4>{title}</h4>
          <p>{paragraph}</p>
          <button className="btn btn-sm btn-dark">SHOP NOW</button>
        </div>
        <div
          className="d-block d-md-none"
          style={{
            // position: "absolute",
            // top: "200px",
            // right: "-20%",
            backgroundColor: "whitesmoke",
            // height: "200px",
            // width: "300px",
            padding: "20px",
            margin: "0px",
            // boxShadow: "2px 15px 100px #010101",
          }}
        >
          <h4>{title}</h4>
          <p>{paragraph}</p>
          <button className="btn btn-sm btn-dark">SHOP NOW</button>
        </div>
      </div>
    </div>
  );
}

export default ProductHero;
