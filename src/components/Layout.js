import * as React from "react";
import { Helmet } from "react-helmet";
import "../style/custom-style.sass";
import { withPrefix, graphql, useStaticQuery } from "gatsby";
import { getImageData, getSrc } from "gatsby-plugin-image";

const TemplateWrapper = ({ title, description, slug, children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
        frontmatter {
          title
          description
          seoImage {
            childImageSharp {
              fixed(width: 600) {
                src
              }
            }
          }
        }
      }
    }
  `);

  slug = slug || "";
  title = title
    ? `${data.markdownRemark.frontmatter.title} | ${data.markdownRemark.frontmatter.title}`
    : data.markdownRemark.frontmatter.title;
  description = description || data.markdownRemark.frontmatter.description;

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link rel="stylesheet" href="https://use.typekit.net/lnz7dne.css" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`/${slug}`} />
        {data.markdownRemark.frontmatter.seoImage && (
          <meta
            property="og:image"
            content={
              data.markdownRemark.frontmatter.seoImage.childImageSharp.fixed.src
            }
          />
        )}
      </Helmet>
      <div>{children}</div>
    </div>
  );
};

export default TemplateWrapper;
