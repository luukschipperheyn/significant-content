import * as React from "react";
import PropTypes from "prop-types";
import { remark } from "remark";
import remarkHTML from "remark-html";

const ContentBlock = ({ block }) => {
  const HTMLContent = remark()
    .use(remarkHTML)
    .processSync(block.body)
    .toString();
  const transitionTime = 500;
  const [opening, setOpening] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  const [open, setOpen] = React.useState(block.open);
  const [display, setDisplay] = React.useState(block.open ? "block" : "none");
  const [maxHeight, setMaxHeight] = React.useState(block.open ? 2000 : 0);

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

  return (
    <>
      <div
        className={`item content-block-toggle row-${block.rows} col-${
          block.columns
        } radius-${block.round ? 2 * Math.min(block.rows, block.columns) : 1}`}
        onClick={() => handleToggle()}
      >
        <div className="title">{block.label}</div>
      </div>
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
        {!!block.bottomImages && block.bottomImages.length > 0 && (
          <div className="content-block-bottom-images">
            {block.bottomImages.map((src) => (
              <div
                style={{ width: `${100 / (block.bottomImages.length + 1)}%` }}
              >
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ContentBlock;