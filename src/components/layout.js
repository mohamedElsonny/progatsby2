import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Spring } from 'react-spring'
import styled from 'styled-components'

import Header from './header'
import './layout.css'
import Archive from './archive'

const MainLayout = styled.main`
  max-width: 90%;
  margin: 1rem auto 0;

  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 4rem;
`

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        file(relativePath: { regex: "/bg/" }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Spring
          from={{ height: location.pathname === '/' ? 200 : 400 }}
          to={{ height: location.pathname === '/' ? 400 : 200 }}
        >
          {styles => (
            <Img
              style={{ overfllow: 'hidden', ...styles }}
              fluid={data.file.childImageSharp.fluid}
            />
          )}
        </Spring>
        <MainLayout>
          {console.log({ location })}
          <div>{children}</div>
          <Archive />
        </MainLayout>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  location: {},
}

export default Layout
