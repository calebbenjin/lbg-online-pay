import Layout from '../../components/AccountLayout'
import Button from '../../components/Button'
import Link from 'next/link'
import { parseCookies } from '../../config/parseCookies'
import { API_URL } from '../../config/index'
import Image from 'next/image'
import transImg from '../../public/transaction.png'
import { formatToCurrency } from '../../helpers'
import { IoWalletSharp } from 'react-icons/io5'
// import TradingView from '../../components/TradingView'

const Dashboard = ({ user }) => {
  const data = user

  console.log(user)

  return (
    <Layout>
      <header className='accHeader'>
        <div className='title'>
          {/* <h2>Home</h2> */}
          <h5>{`Welcome, ${data?.firstname}  ${data?.lastname}`}</h5>
        </div>
      </header>

      <section className='accSection'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='balanceCard'>
              <h6>
                <IoWalletSharp className='balanceIcon' />
                BALANCE
              </h6>
              <h3 className='balance'>
                {data?.recieveCurrency}{' '}
                {!data?.recieveAmount
                  ? '0.00'
                  : formatToCurrency(data?.recieveAmount)}
              </h3>
              <Link href='/'>
                <a className='accountType'>Premier savings 08776767766</a>
              </Link>
            </div>
            <div className="transBtnContainer">
              <Link href='/account/payment'>
                <a className="transBtn">
                  <Button>Banks Transfer</Button>
                </a>
              </Link>
              <Link href='/account/payment'>
                <a className="transBtn">
                  <Button>Withdraw</Button>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <div className='balanceCard'>
              <h4 className='title'>Transactions</h4>
              <div className='noTransaction'>
                <Image src={transImg} alt='Transactions Image' />
                <h5>You have no transactions</h5>
                <p>You haven&lsquo;t make any transactions yet!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  const resUser = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user = await resUser.json()

  // console.log(user)

  return {
    props: {
      user: user,
      token: token
    },
  }
}

export default Dashboard
