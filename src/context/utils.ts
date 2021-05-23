import moment from 'moment';
import {TransactionType} from '../types';

type ThunkAction<T> = (dispatch: React.Dispatch<T>) => T;
type AsyncDispatch<T> = React.Dispatch<T | ThunkAction<T>>;

export function wrapAsync<T>(dispatch: React.Dispatch<T>): AsyncDispatch<T> {
  return function (action: T | ThunkAction<T>) {
    if (action instanceof Function) {
      return action(dispatch);
    }
    return dispatch(action);
  };
}

export const sortAsc = (transactions: Array<TransactionType>) => {
  transactions.sort((transactionA, transactionB) => {
    if (moment(transactionA.date).isAfter(transactionB.date)) return 1;
    if (moment(transactionA.date).isBefore(transactionB.date)) return -1;
    return 0;
  });
  return transactions;
};

export const sumTotal = (transactions: Array<TransactionType>) => {
  return transactions
    .reduce((acc, item) => acc + item.amountInCents, 0)
    .toFixed(2);
};

export const filterTransactionsByQuery = (
  transactions: Array<TransactionType>,
  query,
) => {
  let filteredTransactions = [...transactions];
  if (query.startDate !== undefined && query.startDate !== null) {
    filteredTransactions = filteredTransactions.filter(transaction =>
      moment(transaction.date).isAfter(query.startDate),
    );
  }
  if (query.endDate !== undefined && query.endDate !== null) {
    filteredTransactions = filteredTransactions.filter(transaction =>
      moment(transaction.date).isBefore(query.endDate),
    );
  }
  if (query.tag !== undefined && query.tag !== null && query.tag !== '') {
    filteredTransactions = filteredTransactions.filter(
      transaction => transaction.tags === query.tag,
    );
  }
  if (query.team !== undefined && query.team !== null && query.team !== '') {
    filteredTransactions = filteredTransactions.filter(
      transaction => transaction.teams === query.team,
    );
  }
  return filteredTransactions;
};
