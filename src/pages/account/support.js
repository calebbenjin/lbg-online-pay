import { useState, useContext } from 'react'
import Layout from '../../components/AccountLayout'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FaWhatsappSquare } from 'react-icons/fa'
import { Spinner } from 'react-bootstrap'
import Button from '../../components/Button'
import AlertDismissible from '../../components/AlertDismissible'
import contactImg from '../../public/contactus.png'
import Image from 'next/image'
import { AuthContext } from '../../context/Authcontext'

const SupportPage = () => {
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
    <Layout>
      <header className='accHeader'>
        <div className='title'>
          <h2>Support</h2>
          <p>Welcome Back, Kanu.</p>
        </div>
      </header>

      <section className='accSection'>
        <div className='row'>
          <div className='col-lg-12 mx-auto'>
            <div className='balanceCard'>
              <div className='row'>
                <div className='col-lg-6 mx-auto'>
                  <div className='noTransaction'>
                    <Image src={contactImg} alt='transactions Image' />
                    <h4>Contact support</h4>
                    <p className='modalSubHeading mb-4'>
                      Will you like to have live chat with an agent?
                    </p>
                    <Link href='/'>
                      <a className='chatBtn mt-4'>
                        <FaWhatsappSquare className='icon' />
                        Chat on WhatsApp now
                      </a>
                    </Link>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='supportForm'>
                    {isAlert ? (
                      <AlertDismissible message='Message sent successfuly!' />
                    ) : null}

                    <div className='formBody'>
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
                          {errors.email && (
                            <small>Last email is required</small>
                          )}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SupportPage
