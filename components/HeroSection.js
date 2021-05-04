import React from "react";
import Carousel from "react-material-ui-carousel";

function HeroSection({ variants }) {
  return (
    <div>
      <Carousel indicators={false} animation="slide">
        {variants?.map((item) => (
          <img
            style={{ height: "480px", width: "100%", objectFit: "cover" }}
            key={item.asset_id}
            src={item.url}
            alt={item.title}
          />
        ))}
      </Carousel>
    </div>
  );
}
export default HeroSection;
