import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import styled from 'styled-components'

const BLOG_ARCHIVE_QUERY = graphql`
  query BLOG_ARCHIVE_QUERY {
    allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`

const ArchiveStyles = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  a {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 0.8rem;
    text-decoration: underline;
    color: #524763;
  }
`

const Archive = () => (
  <div
    style={{
      margin: '0 auto',
      maxWidth: 960,
      padding: '0px 1.0875rem 1.45rem',
      paddingTop: 0,
    }}
  >
    <StaticQuery
      query={BLOG_ARCHIVE_QUERY}
      render={data => (
        <>
          <aside>
            <h3>Archive</h3>
            <ArchiveStyles>
              {data.allMarkdownRemark.edges.map(edge => {
                return (
                  <li key={edge.node.frontmatter.slug}>
                    <Link to={`/posts${edge.node.frontmatter.slug}`}>
                      {edge.node.frontmatter.title}
                    </Link>
                  </li>
                )
              })}
            </ArchiveStyles>
          </aside>
        </>
      )}
    />
  </div>
)

export default Archive
