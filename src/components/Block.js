import React from "react";

export const Block = ({ block, style, className, ...props }) => (
  <div
    className={`item row-${block.rows} col-${block.columns} radius-${
      block.round ? 2 * Math.min(block.rows, block.columns) : 1
    } ${block.border ? "" : "no-box"} ${className}`}
    style={{
      background:
        block.color1 && block.color2
          ? `linear-gradient(315deg, ${block.color1}, ${block.color2})`
          : undefined,
      ...style,
    }}
    {...props}
  ></div>
);
