import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ContentBlock from "../components/ContentBlock";
import ImageBlock from "../components/ImageBlock";

import Layout from "../components/Layout";
import { Block } from "../components/Block";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  slug,
  blocks,
}) => {
  useEffect(() => { 
    if (typeof window === 'undefined') return
    setTimeout(() => document.querySelector(`#${slug}`).scrollIntoView({behavior: 'smooth'}), 500)
  }, [slug])
  return (
    <div>
      <div className="background"></div>
      <div className="container hide-scrollbar">
        <div className="parent">
          {blocks &&
            blocks.map((block, i) => {
              switch (block.type) {
                case "empty-block":
                  return (
                    <Block key={`block-${i}`} block={block} />
                  )
                case "content-block":
                  block.open = !!slug && slug === block.slug
                  return <ContentBlock key={`block-${i}`} block={block} />
                case "image-block":
                  return <ImageBlock key={`block-${i}`} block={block} />
                case "gradient-block":
                  return <Block key={`block-${i}`} block={block} />
                case "text-block":
                  return <Block key={`block-${i}`} block={block}><div className="title">{ block.text }</div></Block>
                default:
                  return <div key={`block-${i}`} className="item"> <div className="title">{block.type}</div></div>;
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

const IndexPage = ({ pageContext }) => {
  const { slug, title, description } = pageContext
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
          slug
        }
      }
    }
  }
  `)
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout slug={slug} title={title} description={description}>
      <IndexPageTemplate
        slug={slug}
        blocks={frontmatter.blocks}
      />
    </Layout>
  );
};

export default IndexPage;

