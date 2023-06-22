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
  bottomImages = [],
}) => {
  const HTMLContent = remark().use(remarkHTML).processSync(body).toString();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div
        className={`item content-block-toggle row-${rows} col-${columns} radius-${
          round ? 2 * Math.min(rows, columns) : 1
        }`}
        onClick={() => setOpen((open) => !open)}
      >
        <div className="title">{label}</div>
      </div>
      <div
        className="content-block-collapse"
        style={{ maxHeight: open ? 3000 : 0 }}
      >
        <div
          className={`content-block-body`}
          dangerouslySetInnerHTML={{ __html: HTMLContent }}
        />
        {bottomImages.length > 0 && (
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
};

export default ContentBlock;
