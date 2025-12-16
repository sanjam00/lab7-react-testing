import React from "react";

function Transaction({ transaction }) {
  // console.log("transaction in Transaction.jsx:", transaction)

  return (
    <tr data-testid="transaction-row">
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
    </tr>
  );
}

export default Transaction;
