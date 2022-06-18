import Image from 'next/image'
import React from 'react'
import Layout from '../../components/AccountLayout'
import transImg from '../../public/transactions.png'


const TransactionsPage = () => {
  return (
    <Layout>
      <header className='accHeader'>
        <div className='title'>
          <h2>Transactions</h2>
          <p>Welcome Back, Kanu.</p>
        </div>
      </header>

      <section className='accSection'>
        <div className='row'>
          <div className='col-lg-10 mx-auto'>
            <div className='balanceCard'>
              <h4 className='title'>Transactions</h4>
              <div className='noTransaction'>
                <Image src={transImg} alt="transactions Image" />
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

export default TransactionsPage
