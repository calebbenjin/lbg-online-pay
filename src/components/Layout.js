import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Head from 'next/head'
import Hero from './Hero'

const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>WorldRemit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
