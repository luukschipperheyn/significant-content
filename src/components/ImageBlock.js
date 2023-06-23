import * as React from "react";
import PropTypes from "prop-types";

const ImageBlock = ({ description, image, border, columns, rows, round }) => {
  return (
    <div
      className={`item row-${rows} col-${columns} radius-${
        round ? 2 * Math.min(rows, columns) : 1
      } ${border ? "" : "no-box"}`}
    >
      <img class="item-image" src={image} alt={description} />
    </div>
  );
};

ImageBlock.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  border: PropTypes.bool,
  columns: PropTypes.number,
  rows: PropTypes.number,
  round: PropTypes.bool,
};

export default ImageBlock;
