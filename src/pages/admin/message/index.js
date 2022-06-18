import React from 'react'
import Layout from '../../../components/AdminLayout'
import { users } from '../../../data'
import Link from 'next/link'
import { parseCookies } from '../../../config/parseCookies'
import { API_URL, NEXT_URL } from '../../../config/index'
import { useRouter } from 'next/router'

const MessagePage = ({messages, token}) => {

  const router = useRouter()

  const handelDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user')) {
      const res = await fetch(`${API_URL}/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      // router.reload()
    } else {
      console.log('This user is not deleted')
    }
  }

  return (
    <Layout>
      <h3>All Messages</h3>
      <hr />
      <div className='tableCard'>
      <table className='styled-table user-table'>
      <thead>
        <tr>
          <th>S/N</th>
          <th>First Name</th>
          <th>Email</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message, index) => (
          <tr key={message?._id}>
            <td>{index}</td>
            <td>{message?.fullname}</td>
            <td>{message?.email}</td>
            <td>{message?.subject}</td>
            <td>
              <Link href={`/admin/message/${message._id}`} passHref>
                <button className='edit'>Read Message</button>
              </Link>
              <button onClick={() => handelDelete(message._id)} className='delete'>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </Layout>
  )
}


export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  const resUser = await fetch(`${API_URL}/messages`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const messages = await resUser.json()

  return {
    props: {
      messages: messages,
      token: token,
    },
  }
}

export default MessagePage
