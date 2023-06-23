import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import ContentBlock from "../components/ContentBlock";
import ImageBlock from "../components/ImageBlock";

import Layout from "../components/Layout";
import { Block } from "../components/Block";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  blocks,
}) => {
  return (
    <div>
      <div className="background"></div>
      <div className="container hide-scrollbar">
        <div className="parent">
          {blocks &&
            blocks.map((block) => {
              switch (block.type) {
                case "empty-block":
                  return (
                    <Block block={block} />
                  )
                case "content-block":
                  return <ContentBlock block={block} />
                case "image-block":
                  return <ImageBlock block={block} />
                case "gradient-block":
                  return <Block block={block} />
                case "text-block":
                  return <Block block={block}><div className="title">{ block.text }</div></Block>
                default:
                  return <div className="item"> <div className="title">{block.type}</div></div>;
              }
            })}
        </div>
      </div>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
  blocks: PropTypes.array,
};

const IndexPage = () => {
  const data = useStaticQuery(graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
      frontmatter {
        blocks {
          columns
          round
          rows
          type
          label
          body
          bottom_images
          image
          border
          color1
          color2
          description
          open
          text
        }
      }
    }
  }
  `)
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        blocks={frontmatter.blocks}
      />
    </Layout>
  );
};

export default IndexPage;

