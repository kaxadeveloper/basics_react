import { useState } from "react";
import { Rate } from "antd";
import "antd/dist/reset.css";
import PropTypes from "prop-types";

export default function StarRating({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Rate
        count={noOfStars}
        value={rating}
        onChange={setRating}
        style={{ fontSize: 40 }}
      />
    </div>
  );
}

StarRating.propTypes = {
  noOfStars: PropTypes.number,
};