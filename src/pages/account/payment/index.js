import { useState } from 'react'
import Layout from '../../../components/AccountLayout'
import { useForm } from 'react-hook-form'
import { Spinner } from 'react-bootstrap'
import Button from '../../../components/Button'
import TaskCodeModal from '../../../components/TaskCodeModal'
import { parseCookies } from '../../../config/parseCookies'
import { API_URL } from '../../../config/index'
import { formatToCurrency } from '../../../helpers'
import { IoWalletSharp } from 'react-icons/io5'
import Link from 'next/link'


const SupportPage = ({ user, token }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoding] = useState(false)
  // const [isAlert, setIsAlert] = useState(false)
  const [showModal, setShowModal] = useState(false)

  console.log(user)

  const onSubmit = async (data) => {
    console.log(data)
    const res = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })

    const resData = await res.json()

    console.log(resData)

    setIsLoding(true)
    // setShowModal(false)
    setTimeout(() => {
      // setShowModal(true)
      setIsLoding(false)
    }, 3000)
  }

  return (
    <Layout>
      <TaskCodeModal
        show={showModal}
        onClose={() => setShowModal(false)}
        data={user}
      />
      <header className='accHeader'>
        <div className='title'>
          <h2>Proceed to payment</h2>
          <p>{`Welcome, ${user?.firstname}  ${user?.lastname}`}</p>
        </div>
      </header>

      <section className='accSection'>
        <div className='row'>
          <div className='col-lg-5'>
            <div className='balanceCard'>
              <h6>
                <IoWalletSharp className='balanceIcon' />
                BALANCE
              </h6>
              <h3 className='balance'>
                {user?.recieveCurrency}
                {!user?.recieveAmount
                  ? '0.00'
                  : formatToCurrency(user?.recieveAmount)}
              </h3>
              <Link href='/'>
                <a className='accountType'>Premier savings 08776767766</a>
              </Link>
            </div>
          </div>
          <div className='col-lg-7 mx-auto'>
            <div className='balanceCard'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h5 className='formTitle'> Enter Account Details</h5>
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
                    placeholder="Beneficiary Account Number"
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
                    placeholder="Amount"
                    {...register('amount', { required: true })}
                  />
                  {errors.amount && <small>Amount is required</small>}
                </div>
                <div className='formBtn'>
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
                        Sending...
                      </>
                    ) : (
                      'PROCEED'
                    )}
                  </Button>
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
