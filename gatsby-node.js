const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ actions: { createPage }, graphql }) => {
  createPage({
    path: "/",
    component: path.resolve(`src/templates/index-page.js`),
  });

  return graphql(`
    query IndexPageTemplate {
      markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
        frontmatter {
          blocks {
            label
            description
            slug
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const { blocks } = result.data.markdownRemark.frontmatter;

    for (const block of blocks) {
      if (block.slug) {
        console.log(`creating page for ${block.slug}`);
        createPage({
          path: "/",
          component: path.resolve(`src/templates/index-page.js`),
          context: {
            slug: block.slug,
            title: block.label,
            description: block.description,
          },
        });
      }
    }
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
