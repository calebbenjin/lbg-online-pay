import { useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import { AiFillCheckCircle } from 'react-icons/ai'
import { formatToCurrency, dateFormater } from '../helpers'

const ResultModal = ({handlePayment, data, show, onClose}) => {

  return (
    <Modal show={show} onClose={onClose}>
      <div className='container'>
        <div className='modal-heading'>
          <AiFillCheckCircle className='icon' />
          <h4> Transactions Complete </h4>
          <small>
            This transactions has been successfully sent to <br />{' '}
            <b>{`${data?.firstname} ${data?.lastname}`}</b>
          </small>
          <h5>
            <b>Reference NO: {data?.referenceNum}</b>
          </h5>
        </div>
        <div className='userDetails'>
          <li className='listFlex'>
            <p className='list'>reciever:</p>
            <p>
              <b>{`${data?.reciever}`}</b>
            </p>
          </li>
          <li className='listFlex'>
            <p className='list'>send amount:</p>
            <p>{`${!data?.sendAmount ? '0.00' : formatToCurrency(data?.sendAmount)} ${data?.sendCurrency}`}</p>
          </li>
          <li className='listFlex'>
            <p className='list'>recieve amount:</p>
            <p>{`${!data?.recieveAmount ? '0.00' : formatToCurrency(data?.recieveAmount)} ${data?.recieveCurrency}`}</p>
          </li>
          <li className='listFlex'>
            <p className='list'>recieve method:</p>
            <p>{data?.recieveMethod}</p>
          </li>
          <li className='listFlex'>
            <p className='list'>transaction date:</p>
            <p>{!data?.transationDate ? 'date' : dateFormater(data?.transationDate)}</p>
          </li>
          <li className='listFlex'>
            <p className='list'>pickup date:</p>
            <p>
              <b>{!data?.pickupDate ? 'date' : dateFormater(data?.pickupDate)}</b>
            </p>
          </li>
          <li className='listFlex'>
            <p className='list'>Local Agent charges</p>
            {data?.isPaid ? <p className='text-success agent-charge'>Paid</p> : <p className='text-danger agent-charge'>Not Paid</p>}
          </li>
      <button className='proceedBtn' onClick={handlePayment}>Procced to recieve payment</button>
        </div>
      </div>
    </Modal>
  )
}

export default ResultModal
