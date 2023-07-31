import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

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
      {block.image && block.image.childImageSharp && (
        <GatsbyImage
          image={block.image.childImageSharp.gatsbyImageData}
          imgStyle={{ objectFit: "contain" }}
          style={{ height: "100%" }}
          objectFit="contain"
        />
      )}
    </a>
  );
};

export default ImageBlock;
