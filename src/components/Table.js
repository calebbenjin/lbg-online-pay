import { useEffect, useState } from 'react'
import Link from 'next/link'
import { parseCookies } from '../config/parseCookies'
import { NEXT_URL, API_URL } from '../config/index'
import { useRouter } from 'next/router'

const Table = ({ data, path, token }) => {

  const router = useRouter()

  const handelDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user')) {
      const res = await fetch(`${API_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      router.reload()
    } else {
      console.log('This user is not deleted')
    }
  }

  console.log(data)

  return (
    <table className='styled-table user-table'>
      <thead>
        <tr>
          <th>S/N</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Amount</th>
          <th>Email</th>
          <th>Reference Num</th>
          <th>voulcher num</th>
          <th>Tax code</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((user, index) => (
          <tr key={user._id}>
            <td>{index}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td><b>{user.currency} {user.amount}</b></td>
            <td>{user.email}</td>
            <td>{user.referenceNum}</td>
            <td>{user.voulcherNum}</td>
            <td>{user.taskCode}</td>
            <td>
              <Link href={`${path}/${user._id}`} passHref>
                <button className='edit'>Edit</button>
              </Link>
              <button onClick={() => handelDelete(user._id)} className='delete'>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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

  return {
    props: {
      token: token,
    },
  }
}

export default Table
