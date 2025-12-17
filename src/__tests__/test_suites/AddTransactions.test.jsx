import React from 'react'
import App from '../../components/App'
import { describe, test, expect } from 'vitest'
import { fireEvent, userEvent, screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Our test will', () => {

  test('ensure new transactions are added to frontend', async () => {
    //   //make sure new items are rendered
    //   // render(<App />)
    //   const transactionRows = screen.getAllByTestId('transaction-row')
    //   expect(transactionRows).toHaveLength(baseTransactions.length)

    // mock GET response then render app
    global.setFetchResponse(global.baseTransactions)
    render(<App />)

    // ensure existing transactions render
    const transactionRows = await screen.findAllByTestId('transaction-row')
    expect(transactionRows).toHaveLength(global.baseTransactions.length)

    //simulate adding a transaction; simulate date, description, category, and amount. (bc that's what the form would add as well- simulate the behavior of the user!)
    // fireEvent.change(screen.getAllByTestId('date-input'), {
    //   target: { value: 12 / 16 / 2025 }
    // })

    // fireEvent.change(screen.getAllByTestId('description-input'), {
    //   target: { value: 'Coffee' }
    // })

    // fireEvent.change(screen.getAllByTestId('category-input'), {
    //   target: { value: 'Food' }
    // })

    // fireEvent.change(screen.getAllByTestId('date-input'), {
    //   target: { value: 8.66 }
    // })

    // fireEvent.click(screen.getByRole('button', { name: /add transaction/i }))

    // prepare POST mock for the new transaction
    const newTransaction = { id: '13', date: '2025-12-16', description: 'Coffee', category: 'Food', amount: 8.66 }
    global.setFetchResponse(newTransaction)

    // simulate adding a transaction
    // fireEvent.change(screen.getByTestId('date-input'), { target: { value: '2025-12-16' } })
    // fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Coffee' } })
    // fireEvent.change(screen.getByTestId('category-input'), { target: { value: 'Food' } })
    // fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '8.66' } })
    // // submit the form to trigger POST and state update
    // fireEvent.click(screen.getByRole('button', { name: /add transaction/i }))

    const user = userEvent.setup()

    await user.type(screen.getByTestId('date-input'), '2025-12-16')
    await user.type(screen.getByTestId('description-input'), 'Coffee')
    await user.type(screen.getByTestId('category-input'), 'Food')
    await user.type(screen.getByTestId('amount-input'), '8.66')

    await user.click(screen.getByRole('button', { name: /add transaction/i }))

    // after POST resolves, expect one more row
    const updatedRows = await screen.findAllByTestId('transaction-row')
    expect(updatedRows).toHaveLength(global.baseTransactions.length + 1)
  })

  // test('ensure post request was called', () => {

  // })
})
