import * as React from "react";
import PropTypes from "prop-types";

const ImageBlock = ({ block, ...props }) => {
  return (
    <a
      className={`item row-${block.rows} col-${block.columns} radius-${
        block.round ? 2 * Math.min(block.rows, block.columns) : 1
      } ${block.border ? "" : "no-box"}`}
      {...props}
      href={block.link || null}
      target="_blank"
    >
      <img className="item-image" src={block.image} alt={block.description} />
    </a>
  );
};

export default ImageBlock;
