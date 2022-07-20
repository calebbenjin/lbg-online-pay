import { useState } from 'react'
import Layout from '../../../components/AccountLayout'
import { useForm } from 'react-hook-form'
import { Spinner } from 'react-bootstrap'
import Button from '../../../components/Button'
import TaskCodeModal from '../../../components/TaskCodeModal'
import { useRouter } from 'next/router'
import SupportModal from '../../../components/SupportModal'
import { parseCookies } from '../../../config/parseCookies'
import { API_URL } from '../../../config/index'

const Voulcher = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoding] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [supportModal, setSupportModal] = useState(false)

  const router = useRouter()

  const voulcherNum = user?.voulcherNum

  const onSubmit = (data) => {
    // setShowModal(false)
    setIsLoding(true)
    if (voulcherNum === data.voulcherNum) {
      setIsSuccess(true)
      setTimeout(() => {
        setIsLoding(false)
        router.push('/account')
      }, 4000)
    } else {
      setIsLoding(false)
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
      }, 3000)
    }
  }

  const handleSupport = () => {
    setSupportModal(true)
  }

  return (
    <Layout data={user}>
      <TaskCodeModal show={showModal} onClose={() => setShowModal(false)} />
      <section className='accSection'>
        <div className='row'>
          <div className='col-lg-6 mx-auto'>
            <div className='formCard'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h5 className='formTitle'>Enter your payment voucher</h5>
                {isError ? <p className="errAlert">Incorrect Voucher Number!</p> : null}
                {isSuccess ? (
                  <p className="successAlert">Awesome your Voucher Number is correct!! Redirecting...</p>
                ) : null}
                <div className='formControl'>
                  <label htmlFor='name'>VOUCHER NUMBER</label>
                  <input
                    type='text'
                    {...register('voulcherNum', { required: true })}
                  />
                  {errors.voulcherNum && (
                    <small>Voucher Number is required</small>
                  )}
                </div>
                <div className='formBtn'>
                  <button className='paymentBtn'>
                    {isLoading ? (
                      <>
                        <Spinner
                          as='span'
                          animation='grow'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                        />{' '}
                        Sending...
                      </>
                    ) : (
                      'COMPLETE TRANSACTION'
                    )}
                  </button>
                </div>
                <div className='support'>
                  <SupportModal
                    show={supportModal}
                    onClose={() => setSupportModal(false)}
                  />
                  <p>Don&lsquo;t have a voucher code?</p>
                  <div onClick={handleSupport}>
                    <a className='taskBtn'>Request for your voucher code!</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  const resUser = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user = await resUser.json()

  return {
    props: {
      user: user,
      token: token,
    },
  }
}

export default Voulcher
