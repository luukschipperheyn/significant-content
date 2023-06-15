import * as React from "react";
import PropTypes from "prop-types";
import { remark } from "remark";
import remarkHTML from "remark-html";
import $ from "jquery";

const ContentBlock = ({ label, columns, rows, round, body }) => {
  let HTMLContent = remark().use(remarkHTML).processSync(body).toString();
  const $html = $(HTMLContent);
  $html.find("img").parent().addClass("img-parent");
  const $container = $("<div />").append($html);
  $container
    .find(".img-parent")
    .wrapAll('<div class="img-parent-container" />');

  HTMLContent = $container.html();
  console.log({
    $html: $html,
    HTMLContent,
    $container,
  });
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
