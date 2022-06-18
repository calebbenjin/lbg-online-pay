import React from 'react'
import Modal from './Modal'

const SuccessModal = ({ title, message, show, onClose}) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="modalContainer">
        <h4>{title}</h4>
        <p>{message}</p>
        <h1>Icon goes here</h1>
      </div>
    </Modal>
  )
}

export default SuccessModal
