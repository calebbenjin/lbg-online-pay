import { useState } from 'react'
import Layout from './AccountLayout'
import { useForm } from 'react-hook-form'
import { Spinner } from 'react-bootstrap'
import TaskCodeModal from './TaskCodeModal'
import { useRouter } from 'next/router'
import SupportModal from './SupportModal'
import { parseCookies } from '../config/parseCookies'
import { API_URL } from '../config/index'
import Modal from './Modal'

const VoulcherModal = ({ user, token, show, onClose, setShowVoucherModal, setIsSuccessful, setShowCardModal }) => {
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
    setShowModal(false)
    setIsLoding(true)
    if (voulcherNum === data.voulcherNum) {
      setIsSuccess(true)
      setTimeout(() => {
        setIsLoding(false)
        setShowVoucherModal(false)
        setIsSuccessful(true)
        setShowCardModal(true)
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
    <>
      <TaskCodeModal show={showModal} onClose={() => setShowModal(false)} />
      <Modal show={show} onClose={onClose}>
        <div className='modalForm'>
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
      </Modal>
    </>
  )
}

export default VoulcherModal
