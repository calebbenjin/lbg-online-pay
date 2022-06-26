import Hero from '../components/Hero'
import SavingSection from '../components/SavingSection'
import ChooseSection from '../components/ChooseSection'
import { FaWhatsappSquare } from 'react-icons/fa'
import Link from 'next/link'
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
      <Link href='https://wa.link/7q2lll'>
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
