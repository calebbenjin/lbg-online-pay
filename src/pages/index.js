import { useEffect } from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import SavingSection from '../components/SavingSection'
import ChooseSection from '../components/ChooseSection'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { FaWhatsappSquare } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo2.svg'
import MobileSection from '../components/MobileSection'
import CardSection from '../components/CardSection'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ChooseSection />
      <SavingSection />
      <MobileSection />
      <Link href='https://wa.link/nugajg'>
        <a target='_blank' className='liveChatBtn'>
          <FaWhatsappSquare className='icon' />
          Live Chat
        </a>
      </Link>
      <CardSection />
      <Footer />
    </>
  )
}
