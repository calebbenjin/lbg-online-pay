import React from 'react'

const TransactionsTable = () => {
  return (
    <div className='transactionRow'>
      <div className='transTitle'>
        <p className="mobile" >S/N</p>
        <p>Type</p>
        <p>Amount</p>
        <p className="mobile" >Acct Name</p>
        <p>Acct Number</p>
        <p>Date</p>
      </div>

      <div className='list'>
        <p className="mobile">1</p>
        <p className="debit">Debit</p>
        <p>$34,000.00</p>
        <p className="mobile" >Mario John</p>
        <p>098687762</p>
        <p>12/04/222</p>
      </div>
      <div className='list'>
        <p className="mobile">1</p>
        <p className="debit">Debit</p>
        <p>$34,000.00</p>
        <p className="mobile" >Mario John</p>
        <p>098687762</p>
        <p>12/04/222</p>
      </div>
      <div className='list'>
        <p className="mobile">1</p>
        <p className="credit">Credit</p>
        <p>$34,000.00</p>
        <p className="mobile" >Mario John</p>
        <p>098687762</p>
        <p>12/04/222</p>
      </div>
    </div>
  )
}

export default TransactionsTable
