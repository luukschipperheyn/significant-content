import * as React from "react";
import PropTypes from "prop-types";
import { remark } from "remark";
import remarkHTML from "remark-html";

const ContentBlock = ({
  label,
  columns,
  rows,
  round,
  body,
  bottomImages,
  open: defaultOpen,
}) => {
  const HTMLContent = remark().use(remarkHTML).processSync(body).toString();
  const transitionTime = 500;
  const [opening, setOpening] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  const [open, setOpen] = React.useState(defaultOpen);
  const [display, setDisplay] = React.useState("none");
  const [maxHeight, setMaxHeight] = React.useState(0);

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
        className={`item content-block-toggle row-${rows} col-${columns} radius-${
          round ? 2 * Math.min(rows, columns) : 1
        }`}
        onClick={() => handleToggle()}
      >
        <div className="title">{label}</div>
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
        {!!bottomImages && bottomImages.length > 0 && (
          <div className="content-block-bottom-images">
            {bottomImages.map((src) => (
              <div style={{ width: `${100 / (bottomImages.length + 1)}%` }}>
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

ContentBlock.propTypes = {
  label: PropTypes.string,
  columns: PropTypes.number,
  rows: PropTypes.number,
  round: PropTypes.bool,
  body: PropTypes.string,
  open: PropTypes.bool,
};

export default ContentBlock;
