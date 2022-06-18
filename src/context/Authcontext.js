import { createContext, useEffect, useState } from 'react'
import { NEXT_URL, API_URL } from '../config/index'
import { useRouter } from 'next/router'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [user, setUser] = useState()
  const [checkTransfer, setCheckTransfer] = useState()
  const [supportData, setSupportData] = useState()
  const [showModal, setShowModal] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [isAlert, setIsAlert] = useState(false)

  const router = useRouter()


  // useEffect(() => checkUserLoggedIn(), [])

  const login = async ({ email, password }) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data)
      if (data.apiData.isAdmin === true) {
        router.push('/admin')
      } else {
        router.push('/account')
      }
    } else {
      setIsError(true)
      setIsLoading(false)
      setTimeout(() => {
        setIsError(false)
      }, 5000)
    }
  }


  const check = async ({ referenceNum, email }) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
    const res = await fetch(`${NEXT_URL}/api/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        referenceNum,
        email,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      setCheckTransfer(data.apiData)
      setTimeout(() => {
        setShowModal(true)
        setIsLoading(false)
      }, 3000)
    } else {
      setShowModal(false)
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
      }, 5000)
      setIsLoading(false)
    }
  }

  //  Support Data
  const support = async ({ fullname, subject, email, body }) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
    const res = await fetch(`${NEXT_URL}/api/support`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname,
        subject,
        email,
        body,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      setSupportData(data.apiData)
      setIsAlert(true)
      setTimeout(() => {
        setIsLoading(false)
        setIsAlert(false)
      }, 3000)
    } else {
      setTimeout(() => {
        setIsAlert(false)
      }, 5000)
      setIsLoading(false)
    }
  }


  
  const signup = async ({
    firstname,
    lastname,
    email,
    password
  }) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
    const res = await fetch(`${NEXT_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password
      }),
    })

    if (res.ok) {
      router.push('/signin')
    } else {
      setIsLoading(false)
    }
  }

  // Admin Create user
  const createUser = async ({
    firstname,
    lastname,
    email,
    password
  }) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
    const res = await fetch(`${NEXT_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password
      }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setIsLoading(false)
    }
  }
  // Check if user is logged in
  // ================================================
  // const checkUserLoggedIn = async () => {
  //   const res = await fetch(`${NEXT_URL}/api/user`)
  //   const data = await res.json()

  //   if (res.ok) {
  //     setUser(data)
  //   } else {
  //     setUser(null)
  //   }
  // }

  // Logout
  const logout = async () => {
    fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    })
      .then((res) => {
        setUser(null)
        router.push('/signin')
      })
      .catch((error) => {
        console.error('error logging out user')
      })
  }

  return (
    <AuthContext.Provider
      value={{
        check,
        checkTransfer,
        user,
        login,
        signup,
        logout,
        isLoading,
        setIsLoading,
        isError,
        showModal,
        setShowModal,
        showSupportModal,
        setShowSupportModal,
        support,
        isAlert,
        createUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
