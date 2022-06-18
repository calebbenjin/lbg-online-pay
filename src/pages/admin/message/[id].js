import React from 'react'
import Layout from '../../../components/AdminLayout'
import Button from '../../../components/Button'
import { parseCookies } from '../../../config/parseCookies'
import { API_URL, NEXT_URL } from '../../../config/index'


const ReadMessage = ({message}) => {
  return (
    <Layout>
      <h4>Read Message</h4>
      <hr />
      <div className="message-form">
        <h4 className="username">{message?.fullname}</h4>
        <form>
          <label>Title</label>
          <input type="text" value={message?.subject} />
          <label>Body</label>
          <textarea value={message?.body}></textarea>
        </form>
      </div>
    </Layout>
  )
}


export async function getServerSideProps({ req, query: { id } }) {
  const { token } = parseCookies(req)

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  const resUser = await fetch(`${API_URL}/messages/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const message = await resUser.json()

  return {
    props: {
      message: message,
      token: token,
    },
  }
}

export default ReadMessage
