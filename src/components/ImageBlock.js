import * as React from "react";
import PropTypes from "prop-types";

const ImageBlock = ({ block, ...props }) => {
  return (
    <div
      className={`item row-${block.rows} col-${block.columns} radius-${
        block.round ? 2 * Math.min(block.rows, block.columns) : 1
      } ${block.border ? "" : "no-box"}`}
      {...props}
    >
      <img className="item-image" src={block.image} alt={block.description} />
    </div>
  );
};

export default ImageBlock;
