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
import { useRouter } from 'next/router'
import { FaWhatsappSquare } from 'react-icons/fa'

const Dashboard = ({ user, token }) => {
  const [isTransaction, setIsTransaction] = useState(false)
  const [isFund, setIsFund] = useState(false)
  const data = user

  const router = useRouter()

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

  const handleTransfer = () => {
    // console.log(data)
    if (data?.amount < 0 || data?.amount == undefined) {
      setIsFund(true)
    } else {
      router.push('/account/payment')
    }
  }

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
                    {isFund ? (
                      <small className='alert'>Insuficent Balance!!</small>
                    ) : null}
                  </h3>
                </div>
              </div>
              <div className='transBtnContainer'>
                <button className='transBtn' onClick={handleTransfer}>
                  <a>
                    <MdDoubleArrow className='icon' />
                    Transfer Funds
                  </a>
                </button>
                <button className='transBtn line'>
                  <Link href='/account/payment'>
                    <a>
                      <FaMoneyBillAlt className='icon' />
                      Withdraw Funds
                    </a>
                  </Link>
                </button>
              </div>
            </div>
            <div className='transactionCard'>
              {isTransaction ? (
                <TransactionsTable />
              ) : (
                <div className='noTransaction'>
                  <h3 className='title'>Transactions</h3>
                  <h5>You have no transactions</h5>
                  <p>You haven&lsquo;t make any transactions yet!</p>
                  <Image src={transImg} alt='Transactions Image' />
                </div>
              )}
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='charts'>
              {<AdvancedChart widgetProps={{ theme: 'light' }} /> && (
                <AdvancedChart widgetProps={{ theme: 'light' }} />
              )}
            </div>
          </div>
        </div>
      </section>
      <Link href='https://wa.link/7q2lll'>
        <a target='_blank' className='liveChatBtn'>
          <FaWhatsappSquare className='icon' />
          Live Chat
        </a>
      </Link>
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
