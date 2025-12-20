import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState('description')
  // console.log(search)

  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then(r => r.json())
      .then(data => setTransactions(data))
  }, [])

  function postTransaction(newTransaction) {
    fetch('http://localhost:6001/transactions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
      .then(r => r.json())
      .then(data => setTransactions([...transactions, data]))
    // .then(data => setTransactions(prev => [...prev, data]))

  }

  // Sort function here
  function onSort(sortBy) {
    if (sortBy) {
      setSort((prev) => sortBy)
    }
  }
  // console.log(sort)

  // Filter using search here and pass new variable down
  // transactions.description.toUpperCase() == search.toUpperCase()
  const filerRegex = new RegExp(search, 'i');
  const filteredTransactions = transactions.filer((transaction) => {
    return filerRegex.test(transaction.description)
  }).toSorted((transaction1, transaction2) => {
    // if (sort === 'category') {
    //   return transaction1.category.localeCompare(transaction2.category)
    // }
    // return transaction1.description.localeCompare(transaction2.description)
    return transaction1[sort].localeCompare(transaction2[sort]);
  })


  return (
    <div>
      <Search setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      <Sort onSort={onSort} />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
