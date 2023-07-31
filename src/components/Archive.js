import React, { Fragment } from "react";
import ContentBlock from "./ContentBlock";

const Archive = ({ block, ...props }) => {
  const transitionTime = 500;
  const [opening, setOpening] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [display, setDisplay] = React.useState(open ? "grid" : "none");
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
      setDisplay("grid");
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
    <Fragment {...props}>
      <div
        className={`item content-block-toggle row-1 col-2`}
        onClick={() => handleToggle()}
        {...props}
      >
        <div className="title">{block.label}</div>
      </div>
      <div
        className="content-block-collapse parent"
        style={{
          display,
          maxHeight,
        }}
      >
        {block.items.map((item) => (
          <ContentBlock
            block={{ ...item, border: true, rows: 1, columns: 4 }}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Archive;
