import { useState, useEffect } from 'react'
import Image from 'next/image'
import Layout from '../../components/AccountLayout'
import transImg from '../../public/transactions.png'
import TransactionsTable from '../../components/TransactionsTable'
import { parseCookies } from '../../config/parseCookies'
import { API_URL } from '../../config/index'

const TransactionsPage = ({ user, token }) => {
  const [isTransaction, setIsTransaction] = useState(false)
  const [transactions, setTransactions] = useState([])

  useEffect(() => fetchTransactions(), [])

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API_URL}/users/${user._id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      if (res.ok) {
        setIsTransaction(true)
        setTransactions(data?.transactions)
      }
    } catch (error) {}
  }

  return (
    <Layout>

      <section className='accSection'>
        <div className='row'>
          <div className='col-lg-10 mx-auto'>
            <div className='transactionCard'>
              {isTransaction ? (
                <TransactionsTable data={transactions} />
              ) : (
                <div className='noTransaction'>
                  <h4 className='title'>Transactions</h4>
                  <h5>You have no transactions</h5>
                  <p>You haven&lsquo;t make any transactions yet!</p>
                  <Image src={transImg} alt='transactions Image' />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const resUser = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user = await resUser.json()

  return {
    props: {
      user: user,
      token: token,
    },
  }
}

export default TransactionsPage
