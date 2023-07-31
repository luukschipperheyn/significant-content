import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { remark } from "remark";
import remarkHTML from "remark-html";
import { GatsbyImage } from "gatsby-plugin-image";

const ContentBlock = ({ block, ...props }) => {
  console.log({ block }, block.open || !block.label);
  const HTMLContent = remark()
    .use(remarkHTML, { sanitize: false })
    .processSync(block.body)
    .toString();
  const transitionTime = 500;
  const [opening, setOpening] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  const [open, setOpen] = React.useState(block.open || !block.label);
  const [display, setDisplay] = React.useState(open ? "block" : "none");
  const [maxHeight, setMaxHeight] = React.useState(open ? 2000 : 0);

  const handleToggle = () => {
    if (opening || closing) return;
    if (open) {
      setClosing(true);
    } else {
      setOpening(true);
    }
  };

  React.useEffect(() => {
    if (opening) {
      setDisplay("block");
      setTimeout(() => setMaxHeight(2000), 10);
      setTimeout(() => {
        setOpen(true);
        setOpening(false);
      }, transitionTime);
    }
  }, [opening]);

  React.useEffect(() => {
    if (closing) {
      setMaxHeight(0);
      setTimeout(() => {
        setDisplay("none");
        setOpen(false);
        setClosing(false);
      }, transitionTime);
    }
  }, [closing]);

  const bottomImages = block.bottom_images || block["bottom-images"];

  return (
    <Fragment {...props}>
      {!!block.label && (
        <div
          className={`item content-block-toggle row-${block.rows} col-${
            block.columns
          } radius-${
            block.round ? 2 * Math.min(block.rows, block.columns) : 1
          } ${!block.border && "no-box"}`}
          onClick={() => handleToggle()}
          id={block.slug ? block.slug : undefined}
          {...props}
        >
          <div className="title">{block.label}</div>
        </div>
      )}
      <div
        className="content-block-collapse"
        style={{
          display,
          maxHeight,
        }}
      >
        <div
          className={`content-block-body`}
          dangerouslySetInnerHTML={{ __html: HTMLContent }}
        />
        {!!bottomImages && (
          <div className="content-block-bottom-images">
            {bottomImages.map((item, i) => {
              console.log("hoi", item);
              if (!item.image) return;
              if (typeof item.image === "string") {
                return (
                  <a
                    style={{ width: `30%`, display: "block" }}
                    key={`bottomImage-${block.label}-${i}`}
                    href={item.link}
                    target="_blank"
                  >
                    <img
                      className="content-block-bottom-image"
                      src={item.image}
                      alt={item.alt}
                    />
                  </a>
                );
              } else {
                return (
                  <a
                    style={{ width: `30%`, display: "block" }}
                    key={`bottomImage-${block.label}-${i}`}
                    href={item.link}
                    target="_blank"
                  >
                    <GatsbyImage
                      image={item.image.childImageSharp.gatsbyImageData}
                      alt={item.alt}
                      className="content-block-bottom-image"
                    />
                  </a>
                );
              }
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ContentBlock;
