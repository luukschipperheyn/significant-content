import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import Layout from "../components/Layout";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  title,
  heading,
  subheading,
  mainpitch,
  description,
  blocks,
}) => {
  return (
    <div>
      <div class="background"></div>
      <div class="container hide-scrollbar">
        <div class="parent">
          {blocks &&
            blocks.map((block) => {
              switch (block.type) {
                case "empty-block":
                  return (
                    <div
                      className={`item row-${block.rows} col-${
                        block.columns
                      } radius-${Math.min(block.rows, block.columns)}`}
                    ></div>
                  );
                default:
                  return <div className="item">{block.type}</div>;
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

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        blocks={frontmatter.blocks}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heading
        subheading
        description
        blocks {
          columns
          round
          rows
          type
        }
      }
    }
  }
`;
