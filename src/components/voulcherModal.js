import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Spinner } from 'react-bootstrap'
import Modal from './Modal'
import Button from './Button'
import { useRouter } from 'next/router'
import SupportModal from './SupportModal'


const voulcherModal = ({ show, onClose, data }) => {
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

  const voulcherNum = data?.voulcherNum

  console.log(data)

  const onSubmit = (data) => {
    setShowModal(false)
    setIsLoding(true)
    if (voulcherNum === data.voulcherNum) {
      setIsSuccess(true)
      setTimeout(() => {
        setIsLoding(false)
        router.push('/account/card')
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
    <Modal show={show} onClose={onClose}>
      <div className='modalForm'>
        <h4 className='modalTitle'>Enter VAT code to proceed...</h4>
        {isError ? <p className='errAlert'>Incorrect VAT Code!</p> : null}
        {isSuccess ? (
          <p className='successAlert'>
            Awesome your VAT code is correct!! Redirecting...
          </p>
        ) : null}
        <h1>Form</h1>
        <div className='formCard'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h5 className='formTitle'>Enter your payment voucher</h5>
            {isError ? (
              <p className='errAlert'>Incorrect Voucher Number!</p>
            ) : null}
            {isSuccess ? (
              <p className='successAlert'>
                Awesome your Voucher Number is correct!! Redirecting...
              </p>
            ) : null}
            <div className='formControl'>
              <label htmlFor='name'>VOUCHER NUMBER</label>
              <input
                type='text'
                {...register('voulcherNum', { required: true })}
              />
              {errors.voulcherNum && <small>Voucher Number is required</small>}
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
    </Modal>
  )
}

export default voulcherModal
