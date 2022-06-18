import { useEffect, useState } from 'react'
import Layout from '../../components/AdminLayout'
import Table from '../../components/Table'
// import { users } from '../../data'
import { parseCookies } from '../../config/parseCookies'
import { API_URL } from '../../config/index'
import Link from 'next/link'

const AdminPage = ({ token }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const res = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    setUsers(data)
  }

  return (
    <Layout>
      <div className='admiheader'>
        <h3>All Users</h3>
        <Link href='/admin/createuser'>
          <a className='createBtn'>Create user</a>
        </Link>
      </div>
      <hr />
      <div className='tableCard'>
        <Table data={users} path="/admin" />
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

  const resUser = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const users = await resUser.json()

  return {
    props: {
      users: users,
      token: token,
    },
  }
}

export default AdminPage
