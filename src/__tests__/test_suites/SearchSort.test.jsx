import AccountContainer from '../../components/AccountContainer';
import data from '../data.json'
import { render, act, screen, fireEvent, within } from '@testing-library/react';

describe('Search Sort', () => {
  test('with empty text return all elements.', async () => {
    setFetchResponse(data.transactions);
    const expected = data.transactions;
    await act(() => {
      render(<AccountContainer />)
    });

    await act(() => {
      let input = screen.getByTestId("search");
      fireEvent.change(input, { target: { value: '' } })
    });

    let tbody = screen.getByTestId("transactions-list");
    expect(tbody).not.toBeNull();
    expect(tbody.childElementCount).toEqual(expected.length);
    for (let transaction of expected) {
      expect(within(tbody).getByText(transaction.description)).toBeInTheDocument();
    }
  });
  test('with "Income" text returns filtered results.', async () => {
    setFetchResponse(data.transactions);
    const expected = data.transactions.filter(t => /income/i.test(t.description));
    await act(() => {
      render(<AccountContainer />)
    });

    await act(() => {
      let input = screen.getByTestId("search");
      fireEvent.change(input, { target: { value: 'Income' } })
    });

    let tbody = screen.getByTestId("transactions-list");
    expect(tbody).not.toBeNull();
    expect(tbody.childElementCount).toEqual(expected.length);
    for (let transaction of expected) {
      expect(within(tbody).getByText(transaction.description)).toBeInTheDocument();
    }
  });
  test('with "XXXXYYYYYZZZZZ" text to return no results', async () => {
    setFetchResponse(data.transactions);
    const expected = data.transactions.filter(t => /XXXXYYYYYZZZZZ/i.test(t.description));
    await act(() => {
      render(<AccountContainer />)
    });

    await act(() => {
      let input = screen.getByTestId("search");
      fireEvent.change(input, { target: { value: 'XXXXYYYYYZZZZZ' } })
    });

    let tbody = screen.getByTestId("transactions-list");
    expect(tbody).not.toBeNull();
    expect(tbody.childElementCount).toEqual(expected.length);
    for (let transaction of expected) {
      expect(within(tbody).getByText(transaction.description)).toBeInTheDocument();
    }
  });
});