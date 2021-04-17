import React from "react";

function MyTestmonialCard() {
  return (
    <div className="gtco-testimonials">
      <div className="owl-carousel owl-carousel1 owl-theme">
        <div>
          <div className="card text-center">
            <img
              className="card-img-top"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="card-body">
              <h5>
                Name <br />
                <span> Role </span>
              </h5>
              <p className="card-text">
                “ Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Autem, porro. Tempore cupiditate laborum eaque eos sunt ipsam
                unde labore nulla quam totam hic, fuga eveniet similique
                possimus, qui saepe? ”{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTestmonialCard;
