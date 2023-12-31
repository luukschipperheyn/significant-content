import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ContentBlock from "../components/ContentBlock";
import ImageBlock from "../components/ImageBlock";

import Layout from "../components/Layout";
import { Block } from "../components/Block";
import Archive from "../components/Archive";

// eslint-disable-next-line
export const IndexPageTemplate = ({ slug, blocks, bgColors }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!slug) return;
    setTimeout(
      () =>
        document
          .querySelector(`#${slug}`)
          .scrollIntoView({ behavior: "smooth" }),
      500
    );
  }, [slug]);
  // console.log(`linear-gradient( 0deg, ${bgColors.join(", ")})`);
  return (
    <div>
      <div
        className="background"
        style={{
          backgroundImage: `linear-gradient( 0deg, ${bgColors.join(", ")})`,
        }}
      ></div>
      <div className="container hide-scrollbar">
        <div className="parent">
          {blocks &&
            blocks.map((block, i) => {
              switch (block.type) {
                case "empty-block":
                  return <Block key={`block-${i}`} block={block} />;
                case "content-block":
                  block.open = block.open || (!!slug && slug === block.slug);
                  return <ContentBlock key={`block-${i}`} block={block} />;
                case "image-block":
                  return <ImageBlock key={`block-${i}`} block={block} />;
                case "gradient-block":
                  return <Block key={`block-${i}`} block={block} />;
                case "text-block":
                  return (
                    <Block key={`block-${i}`} block={block}>
                      <div className="title">{block.text}</div>
                    </Block>
                  );
                case "archive":
                  return <Archive block={block} />;
                default:
                  return (
                    <div key={`block-${i}`} className="item">
                      {" "}
                      <div className="title">{block.type}</div>
                    </div>
                  );
              }
            })}
        </div>
        <div></div>
      </div>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  blocks: PropTypes.array,
};

const IndexPage = ({ pageContext }) => {
  const { slug, title, description } = pageContext;
  const data = useStaticQuery(graphql`
    query IndexPageTemplate {
      markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
        frontmatter {
          bg_colors
          blocks {
            columns
            round
            rows
            type
            label
            body
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
            border
            color1
            color2
            description
            open
            text
            slug
            link
            items {
              label
              body
            }
            bottom_images {
              alt
              link
              image {
                childImageSharp {
                  gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                }
              }
            }
          }
        }
      }
    }
  `);
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout slug={slug} title={title} description={description}>
      <IndexPageTemplate
        slug={slug}
        blocks={frontmatter.blocks}
        bgColors={frontmatter.bg_colors}
      />
    </Layout>
  );
};

export default IndexPage;
