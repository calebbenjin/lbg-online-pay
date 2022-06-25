import { useState, useContext } from 'react'
import Link from 'next/link'
import Modal from './Modal'
import { FaWhatsappSquare } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { Spinner } from 'react-bootstrap'
import Button from './Button'
import AlertDismissible from './AlertDismissible'
import { AuthContext } from '../context/Authcontext'

const SupportModal = ({ show, onClose }) => {
  const { support, isAlert, isLoading } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    support(data)
  }

  return (
    <Modal show={show} onClose={onClose}>
      <div className='modalContainer'>
        <h1 className='modalHeading'>Contact Support</h1>
        <h5 className='modalSubHeading'>
          Will you like to have live chat with an agent?
        </h5>
        <Link href='https://wa.link/7q2lll'>
          <a className='chatBtn' target='_blank'>
            <FaWhatsappSquare className='icon' />
            Live Chat 
          </a>
        </Link>
        <hr />

        <div className='supportForm'>
          {isAlert ? (
            <AlertDismissible message='Message sent successfuly!' />
          ) : null}

          {/* <div className='formBody'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h5 className='formTitle'>Send Message</h5>
              <div className='formControl'>
                <label htmlFor='name'>FULLNAME</label>
                <input
                  type='text'
                  {...register('fullname', { required: true })}
                />
                {errors.fullname && <small>Fullname is required</small>}
              </div>
              <div className='formControl'>
                <label htmlFor='name'>SUBJECT</label>
                <input
                  type='text'
                  {...register('subject', { required: true })}
                />
                {errors.subject && <small>Subject is required</small>}
              </div>
              <div className='formControl'>
                <label htmlFor='email'>YOUR EMAIL</label>
                <input
                  type='email'
                  {...register('email', { required: true })}
                />
                {errors.email && <small>Last email is required</small>}
              </div>
              <div className='formControl'>
                <label htmlFor='message'>YOUR MESSAGE</label>
                <textarea
                  {...register('body', { required: true })}
                ></textarea>
                {errors.body && <small>Message is required</small>}
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
                    'Send Message'
                  )}
                </Button>
              </div>
            </form>
          </div> */}
        </div>
      </div>
    </Modal>
  )
}

export default SupportModal
