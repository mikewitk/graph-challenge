import * as TransactionsGraphType from './transactions-graph.types';
import {TransactionType} from '../../types';
import {Transaction} from '../../api';

export const getTransactionsStart = () => ({
  type: TransactionsGraphType.GET_TRANSACTIONS_START,
});

export const getTransactionsSuccess = (
  transactions: Array<TransactionType>,
) => ({
  type: TransactionsGraphType.GET_TRANSACTIONS_SUCCESS,
  payload: transactions,
});

export const getTransactionsFailure = (errorMessage: string) => ({
  type: TransactionsGraphType.GET_TRANSACTIONS_FAILURE,
  payload: errorMessage,
});

export const getTransactionsStartAsync = () => {
  return async dispatch => {
    dispatch(getTransactionsStart());
    try {
      const transactions = await Transaction.getTransactions();
      dispatch(getTransactionsSuccess(transactions));
    } catch (error) {
      dispatch(getTransactionsFailure(error.message));
    }
  };
};
