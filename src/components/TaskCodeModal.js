import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Spinner } from 'react-bootstrap'
import Modal from './Modal'
import Button from './Button'
import { useRouter } from 'next/router'
import SupportModal from './SupportModal'

const TaskCodeModal = ({show, onClose, data}) => {
  const [isLoading, setIsLoding] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [supportModal, setSupportModal] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
  const router = useRouter()

  const taskCode = data?.taskCode

  const handleTaskCode = (data) => {
    setIsLoding(true)
    if(taskCode === data.taskCode) {
      setTimeout(() => {
        setIsSuccess(true)
        setIsLoding(false)
        router.push('/account/payment/voulcher')
    }, 2000)
      console.log('Successful...')
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
        <h4 className='modalTitle'>Enter task code to proceed...</h4>
        {isError ? <p className="errAlert">Incorrect Task Code!</p> : null}
        {isSuccess ? <p className="successAlert">Awesome your task code is correct!! Redirecting...</p> : null}
        <form onSubmit={handleSubmit(handleTaskCode)}>
          <div className='formControl'>
            <label htmlFor='name'>TASK CODE</label>
            <input type='text' {...register('taskCode', { required: true })} />
            {errors.taskCode && <small>Task Code is required</small>}
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
                  Verifying...
                </>
              ) : (
                'PROCEED'
              )}
            </Button>
          </div>
          <div className='support'>
            <SupportModal show={supportModal} onClose={() => setSupportModal(false)} />
            <p>Don&lsquo;t have a task code?</p>
            <a className='taskBtn' onClick={handleSupport}>Request for task code!</a>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default TaskCodeModal
