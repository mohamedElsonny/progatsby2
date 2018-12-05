import React from 'react'

import Layout from '../components/layout'
import Listing from '../components/Listing'

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <Listing />
  </Layout>
)

export default IndexPage
