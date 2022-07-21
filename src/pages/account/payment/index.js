import { useState } from 'react'
import Layout from '../../../components/AccountLayout'
import { useForm } from 'react-hook-form'
import { Spinner } from 'react-bootstrap'
import TaskCodeModal from '../../../components/TaskCodeModal'
import { parseCookies } from '../../../config/parseCookies'
import { API_URL } from '../../../config/index'
import VoulcherModal from '../../../components/VoulcherModal'
import CardModal from '../../../components/CardModal'
import SuccessModal from '../../../components/SuccessModal'
import { useRouter } from 'next/router'

const SupportPage = ({ user, token }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoding] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showVoucherModal, setShowVoucherModal] = useState(false)
  const [showCardModal, setShowCardModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [showVoucherNum, setShowVoucherNum] = useState(false)
  const [showIsTaxCode, setShowIsTaxCode] = useState(false)

  const router = useRouter()

  // const handleCardSubmit = () => {
  //   setIsLoding(true)
  //   setIsSuccessful(true)
  //   setShowSuccessModal(true)
  //   setShowCardModal(false)
  // }

  const handleVerify = () => {
    setShowModal(true)
  }

  const onSubmit = async (data) => {
    if (user.amount < data.amount || user.amount === undefined) {
      setIsLoding(false)
      setIsAlert(true)
    } else {
      const currentAmount = user.amount - Number(data.amount)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          'currentAmount',
          JSON.stringify(currentAmount)
        )
      }
      setIsLoding(true)
      if (isSuccessful === true) {
        const response = await fetch(`${API_URL}/users/${user?._id}/amount`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: currentAmount,
          }),
        })
        const { amount, accountNumber, bankName, accountName, narration } = data
        if (response.ok) {
          const res = await fetch(
            `${API_URL}/users/${user?._id}/transactions`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                amount,
                type: false,
                bankName,
                accountNumber,
                accountName,
                narration,
              }),
            }
          )
          if (res.ok) {
            router.push('/account')
            setShowModal(false)
            setIsSuccessful(true)
            setShowSuccessModal(true)
          } else {
            console.log('error')
            setIsLoding(false)
          }
        }
      } else {
        setIsLoding(false)
      }
    }
  }

  return (
    <Layout data={user}>
      <TaskCodeModal
        setShowModal={setShowModal}
        setShowVoucherModal={setShowVoucherModal}
        setShowIsTaxCode={setShowIsTaxCode}
        show={showModal}
        onClose={() => setShowModal(false)}
        data={user}
      />
      <VoulcherModal
        setIsSuccessful={setIsSuccessful}
        setShowVoucherModal={setShowVoucherModal}
        setShowVoucherNum={setShowVoucherNum}
        setShowCardModal={setShowCardModal}
        show={showVoucherModal}
        onClose={() => setShowVoucherModal(false)}
        user={user}
        token={token}
      />
      <CardModal
        setIsSuccessful={setIsSuccessful}
        setShowSuccessModal={setShowSuccessModal}
        setShowCardModal={setShowCardModal}
        token={token}
        user={user}
        show={showCardModal}
        onClose={() => setShowCardModal(false)}
        // handleCardSubmit={handleCardSubmit}
      />
      <SuccessModal
        title='Thank You'
        message='Transfer Successful'
        onClose={() => setShowSuccessModal(false)}
        show={showSuccessModal}
      />
      <section className='accSection'>
        <div className='row'>
          <div className='col-lg-7 mx-auto'>
            <div className='formCard'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className='formTitle'> Enter Account Details</h4>
                {isAlert ? <p className='errAlert'>Insuficent Fund</p> : null}
                <div className='formControl'>
                  <label htmlFor='name'>ACCOUNT NAME</label>
                  <input
                    type='text'
                    placeholder='Beneficiary Account Name'
                    {...register('accountName', { required: true })}
                  />
                  {errors.accName && <small>Account Name is required</small>}
                </div>
                <div className='formControl'>
                  <label htmlFor='accountNum'>ACCOUNT NUMBER</label>
                  <input
                    type='text'
                    placeholder='Beneficiary Account Number'
                    {...register('accountNumber', { required: true })}
                  />
                  {errors.accountNum && (
                    <small>Account Number is required</small>
                  )}
                </div>
                <div className='formControl'>
                  <label htmlFor='accountNum'>BANK NAME</label>
                  <input
                    type='text'
                    placeholder='Bank Name'
                    {...register('bankName', { required: true })}
                  />
                  {errors.bankName && <small>Bank Name is required</small>}
                </div>
                <div className='formControl'>
                  <label htmlFor='narration'>NARRATION</label>
                  <input
                    type='text'
                    placeholder='Narration'
                    {...register('narration', { required: true })}
                  />
                  {errors.narration && <small>Narration is required</small>}
                </div>
                <div className='formControl'>
                  <label htmlFor='accountNum'>AMOUNT</label>
                  <input
                    type='text'
                    placeholder='Amount'
                    {...register('amount', { required: true })}
                  />
                  {errors.amount && <small>Amount is required</small>}
                </div>
                <div className='formBtn'>
                  {isSuccessful ? (
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
                  ) : null}
                </div>
              </form>
              {!isSuccessful ? (
                <button onClick={handleVerify} className='paymentBtnOutline'>
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
                    'PROCEED'
                  )}
                </button>
              ) : null}
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
        destination: '/login',
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

export default SupportPage
