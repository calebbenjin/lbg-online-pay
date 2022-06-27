import { useEffect, useState } from 'react'
import Layout from '../../components/AccountLayout'
import Button from '../../components/Button'
import Link from 'next/link'
import { parseCookies } from '../../config/parseCookies'
import { API_URL } from '../../config/index'
import Image from 'next/image'
import transImg from '../../public/transaction.png'
import { formatToCurrency } from '../../helpers'
import { IoWalletSharp } from 'react-icons/io5'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { MdDoubleArrow } from 'react-icons/md'
import TransactionsTable from '../../components/TransactionsTable'
import AdvancedChart from '../../components/AdvancedChart'

const Dashboard = ({ user, token }) => {
  const [isTransaction, setIsTransaction] = useState(true)
  const data = user

  // useEffect(() => {
  //   fetchTransactions()
  // },[])

  // const fetchTransactions = async () => {
  //   const res = await fetch(`${API_URL}/users/${user?._id}/transactions`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })

  //   const transactions = await res.json()

  // }

  console.log(data.transactions)

  return (
    <Layout>
      {/* <TradingWiget /> */}
      <header className='accHeader'>
        <div className='title'>
          <h3>
            Welcome <span>{`${data?.firstname}  ${data?.lastname}`}</span>
          </h3>
        </div>
      </header>

      <section className='accSection'>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='balanceCard'>
              <div className='dashBoardHeader'>
                <h6 className='balanceTitle'>
                  <IoWalletSharp className='balanceIcon' />
                  BALANCE
                </h6>
                <div className='accountNumber'>
                  {data?.accountType} - 08776767766
                </div>
              </div>
              <div className='dashBoard'>
                <div>
                  <h3 className='balance'>
                    <span className='currency'>{data?.currency} </span>
                    {!data?.amount ? '0.00' : formatToCurrency(data?.amount)}
                  </h3>
                </div>
              </div>
              <div className='transBtnContainer'>
                <Link href='/account/payment'>
                  <a className='transBtn'>
                    <MdDoubleArrow className='icon' />
                    Transfer Funds
                  </a>
                </Link>
                <Link href='/account/payment'>
                  <a className='transBtn line'>
                    <FaMoneyBillAlt className='icon' />
                    Withdraw Funds
                  </a>
                </Link>
              </div>
            </div>
            <div className='transactionCard'>
              <h4 className='title'>Transactions</h4>
              {isTransaction ? (
                <TransactionsTable />
              ) : (
                <div className='noTransaction'>
                  <Image src={transImg} alt='Transactions Image' />
                  <h5>You have no transactions</h5>
                  <p>You haven&lsquo;t make any transactions yet!</p>
                </div>
              )}
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='charts'>
              {<AdvancedChart widgetProps={{ theme: 'light' }} /> && <AdvancedChart widgetProps={{ theme: 'light' }} /> }
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

export default Dashboard
