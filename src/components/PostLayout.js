import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from './layout'

export const query = graphql`
  query POST_QUERY($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`

class PostLayout extends Component {
  render() {
    const {
      data: { markdownRemark },
      location,
    } = this.props

    return (
      <Layout location={location}>
        <h1>{markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </Layout>
    )
  }
}

export default PostLayout
