import { useState, useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import Button from './Button'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import ResultModal from './ResultModal'
import SupportModal from './SupportModal'
import { AuthContext } from '../context/Authcontext'
import HeroLoginCard from './HeroLoginCard'

const Hero = () => {
  const { check, checkTransfer, isError, showModal, setShowModal, isLoading,
    setIsLoading } = useContext(AuthContext)
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
    } else  {
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
    <div className='hero'>
      <div className='container'>
        <SupportModal show={showSupportModal} onClose={() => setShowSupportModal(false)} />
        <ResultModal
          show={showModal}
          onClose={() => setShowModal(false)}
          data={checkTransfer}
          handlePayment={handlePayment}
        />
        <div className='heroFlex'>
          <div className='content'>
            <h1>“We are saving more than just energy”</h1>
            <p>
            Find out how we&apos;ve supported Island Delight and others in becoming a more sustainable business whilst reducing their costs
            </p>
          </div>

          <HeroLoginCard />

          {/* <div className='trackForm'>
            <div className='trackFormContainer'>
              <div className='formHeader'>
                <button
                  onClick={handleToggle}
                  className={trackFormBtn ? 'leftBtn' : 'leftBtn btnActive'}
                >
                  RATES & FEES
                </button>
                <button
                  onClick={() => setTrackFormBtn(true)}
                  className={trackFormBtn ? 'rightBtn btnActive' : 'rightBtn'}
                >
                  TRACK & RECEIVE
                </button>
              </div>
              {trackFormBtn ? (
                <div className='formBody track'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <p>
                      Enter the required information below to see if your money
                      is available.
                    </p>
                    
                    {isError ? <div className="errorBadge">Incorrenct Reference Number or Email</div> : null}
                    <div className='formControl'>
                      <label htmlFor='name'>REF/AUTH NUMBER</label>
                      <input
                        type='text'
                        {...register('referenceNum', { required: true })}
                      />
                      {errors.referenceNum && (
                        <small>
                          Authorization or Reference # must contain at least 8
                          characters.
                        </small>
                      )}
                    </div>
                    <div className='formControl'>
                      <label htmlFor='email'>YOUR EMAIL</label>
                      <input
                        type='email'
                        {...register('email', { required: true })}
                      />
                      {errors.email && <small>Last email is required</small>}
                    </div>
                    <div className='formBtn trackBtn'>
                      <Button>
                        {isLoading ? (
                          <>
                            <Spinner
                              as='span'
                              animation='grow'
                              size='sm'
                              role='status'
                              aria-hidden='true'
                            />{' '}
                            Checking...
                          </>
                        ) : (
                          'Track Your Money'
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className='formBody'>
                  <form>
                    <div className='formControl'>
                      <label htmlFor='name'>SEND</label>
                      <input type='text' placeholder='Send Amount' />
                    </div>
                    <div className='formControl'>
                      <label htmlFor='name'>RECEIVER COUNTRY</label>
                      <input type='text' placeholder='Receiver Country' />
                    </div>
                    <div className='formBtn'>
                      <Button>Estimate Fees</Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Hero
