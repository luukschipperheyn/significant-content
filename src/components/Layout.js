import * as React from "react";
import { Helmet } from "react-helmet";
import "../style/custom-style.sass";
import { withPrefix, graphql, useStaticQuery } from "gatsby";

const TemplateWrapper = ({ title, description, slug, children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
        frontmatter {
          title
          description
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
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>
      <div>{children}</div>
    </div>
  );
};

export default TemplateWrapper;
