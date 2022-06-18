import { useState, useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import Button from './Button'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import ResultModal from './ResultModal'
import SupportModal from './SupportModal'
import { AuthContext } from '../context/Authcontext'
import HeroLoginCard from './HeroLoginCard'
import Link from 'next/link'

const SavingSection = () => {
  const {
    check,
    checkTransfer,
    isError,
    showModal,
    setShowModal,
    isLoading,
    setIsLoading,
  } = useContext(AuthContext)
  const [trackFormBtn, setTrackFormBtn] = useState(true)
  const [showSupportModal, setShowSupportModal] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  const handlePayment = () => {
    if (checkTransfer?.isPaid === true) {
      router.push('/signin')
    } else {
      setShowModal(false)
      setShowSupportModal(true)
    }
  }

  const handleToggle = () => {
    setTrackFormBtn(false)
  }

  const onSubmit = async (data) => {
    check(data)
  }

  return (
    <div className='savingSection'>
      <div className='container'>
        <SupportModal
          show={showSupportModal}
          onClose={() => setShowSupportModal(false)}
        />

        <div className='heroFlex'>
          <div className='content'>
            <h1>Savings & Deposits</h1>
            <p>
              Whether you can lock funds away or need instant access, we have a
              range of savings accounts to make your surplus cash work harder.
            </p>
            <div className='btnContainer'>
              <div className='row'>
                <div className='col-md-6'>
                  <Link href='/login'>
                    <button className='btnLight'>Login</button>
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavingSection
