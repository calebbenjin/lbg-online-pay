import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { IoMdClose } from 'react-icons/io'

const Modal = ({show, onClose, children}) => {
  const [ isBrowser, setIsBrowser ] = useState(false)

  useEffect(() => setIsBrowser(true), [])

  const handleClose = (e) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = ( <div className={show ? "modalWrapper" : "hideModal"}>
    <div className="modalbody">
     <div className="closeBtn">
      <IoMdClose onClick={handleClose} />
     </div>
      <div className="modalContent">
        {children}
      </div>
    </div>
  </div>
  )

  if(isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))
  } else {
    return null
  }
  
}

export default Modal