import React from 'react'
import { dateFormater, formatToCurrency } from '../helpers'

const TransactionsTable = ({data}) => {
  return (
    <div className='transactionRow'>
      <div className='transTitle'>
        {/* <p className="mobile" >S/N</p> */}
        <p>Type</p>
        <p>Amount</p>
        {/* <p className="mobile" >Acct Name</p> */}
        <p>Acct Number</p>
        <p>Date</p>
      </div>

      {data.map((transaction) => (
        <div className='list' key={transaction?._id}>
          {/* <p className="mobile">1</p> */}
          <p className={transaction.type === true ? 'creadit' : 'debit'}>{transaction.type === true ? 'Creadit' : 'Debit'}</p>
          <p className={transaction.type === true ? 'creadit' : 'debit'}>{formatToCurrency(transaction?.amount)}</p>
          {/* <p className="mobile" >Mario John</p> */}
          <p>{transaction?.accountNumber}</p>
          <p>{dateFormater(transaction?.createdAt)}</p>
        </div>
      )).reverse()}
    </div>
  )
}

export default TransactionsTable
