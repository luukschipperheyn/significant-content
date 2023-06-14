import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => {
  const heroImage = getImage(image) || image;

  return (
    <div>
      <div class="background"></div>
      <div class="container hide-scrollbar">
        <div class="parent">
          <div class="item"></div>
          <div class="item row-2"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item row-2"></div>
          <div class="item col-2 no-box">
            <img class="item-image" src="https://picsum.photos/204/96" alt="" />
          </div>
          <div class="item"></div>
          <div class="item col-2 radius-2"></div>
          <div class="item radius-2"></div>
          <div class="item col-3 collapse-container">
            <div class="collapse-toggle">
              <div class="title">About</div>
            </div>
            <div class="collapse-content">
              <p>
                Content creators on social media are usually not approached like
                film directors, musicians or designers, while these creators
                make an important contribution to our daily media consumption
                and (digital) culture. In the Significant Content event series,
                popular creators on various social media platforms are offered
                an artist talk.
              </p>
              <p>
                Just as a significant figure in mathematics can make a
                difference in a calculation, the content of these creators can
                make a difference within the framework of a social media
                platform and reveal medium-specific characteristics of this
                platform. These creators often deploy very clever tactics that
                make their content work well within the medium they are using.
                By outlining the content and methods of these creators,
                meanwhile, it unravels how social media platforms work beneath
                the surface.
              </p>
              <p>
                Significant Content was initiated by Sjef van Beers and Florian
                van Zandwijk. The two pilot events are made possible by the
                Creative Industries Fund NL.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
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
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
