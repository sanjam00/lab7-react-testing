import React from "react";
import { render, screen } from "@testing-library/react";
import App from '../../components/App'
import '@testing-library/jest-dom'

describe('Our test will', () => {
  test('ensure transactions are displayed on startup', async () => {
    // expect(true).toBe(false)

    //transactions rendered matches in number to users in fetch response
    global.setFetchResponse(global.baseTransactions)
    render(<App />)
    const transactionItems = await screen.findAllByTestId('transaction-row')
    expect(transactionItems).toHaveLength(global.baseTransactions.length)

    //transaction date rendered as expected (first cell)
    const transDate = transactionItems.map(i => i.querySelectorAll('td')[0].textContent)
    const baseTransDate = global.baseTransactions.map(t => t.date)
    expect(transDate).toEqual(baseTransDate)

    //transaction description rendered as expected (second cell)
    const transDescription = transactionItems.map(i => i.querySelectorAll('td')[1].textContent)
    const baseTransDescription = global.baseTransactions.map(t => t.description)
    expect(transDescription).toEqual(baseTransDescription)

    //transaction category rendered as expected (third cell)
    const transCategory = transactionItems.map(i => i.querySelectorAll('td')[2].textContent)
    const baseTransCategory = global.baseTransactions.map(t => t.category)
    expect(transCategory).toEqual(baseTransCategory)

    //transaction amount rendered as expected (fourth cell)
    const transAmount = transactionItems.map(i => i.querySelectorAll('td')[3].textContent)
    const baseTransAmount = global.baseTransactions.map(t => String(t.amount))
    expect(transAmount).toEqual(baseTransAmount)

  })
})