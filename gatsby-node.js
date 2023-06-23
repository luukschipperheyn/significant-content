const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ actions: { createPage }, graphql }) => {
  createPage({
    path: "/",
    component: path.resolve(`src/templates/index-page.js`),
    // additional data can be passed via context
    // context: {
    //   id,
    // },
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
