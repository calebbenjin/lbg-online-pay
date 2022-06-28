import { useState } from 'react'
import Image from 'next/image'
import Layout from '../../components/AccountLayout'
import transImg from '../../public/transactions.png'
import TransactionsTable from '../../components/TransactionsTable'

const TransactionsPage = () => {
  const [isTransaction, setIsTransaction] = useState(false)

  return (
    <Layout>
      {/* <header className='accHeader'>
        <div className='title'>
          <h2>Transactions</h2>
          <p>Welcome Back, Kanu.</p>
        </div>
      </header> */}

      <section className='accSection'>
        <div className='row'>
          <div className='col-lg-10 mx-auto'>
            <div className='transactionCard'>
              {isTransaction ? (
                <TransactionsTable />
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

export default TransactionsPage
