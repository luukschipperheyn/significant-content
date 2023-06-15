import * as React from "react";
import PropTypes from "prop-types";
import { remark } from "remark";
import remarkHTML from "remark-html";

const ContentBlock = ({ label, columns, rows, round, body }) => {
  const HTMLContent = remark().use(remarkHTML).processSync(body).toString();
  return (
    <>
      <div
        className={`item content-block-toggle row-${rows} col-${columns} radius-${
          round ? 2 * Math.min(rows, columns) : 1
        }`}
      >
        <div className="title">{label}</div>
      </div>
      <div
        className={`content-block-body`}
        dangerouslySetInnerHTML={{ __html: HTMLContent }}
      />
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
