const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `)
      .then(({ data }) => {
        data.allMarkdownRemark.edges.forEach(edge => {
          const { slug } = edge.node.frontmatter
          createPage({
            path: `/posts${slug}`,
            component: path.resolve('./src/components/PostLayout.js'),
            context: {
              slug,
            },
          })
        })
        resolve()
      })
      .catch(err => reject(err))
  })
}
