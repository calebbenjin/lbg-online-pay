import { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'

function AlertDismissible({message}) {
  const [show, setShow] = useState(true);

  setTimeout(() => {
    setShow(false)
  }, 3000)

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>{message}</Alert.Heading>
      </Alert>
    </>
  );
}

export default AlertDismissible