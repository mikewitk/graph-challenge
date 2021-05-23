import {TransactionType} from '../../types';
import * as TransactionsGraphTypes from './transactions-graph.types';
import {sortAsc} from '../utils';

const TransactionsGraphReducer = (state, action) => {
  switch (action.type) {
    case TransactionsGraphTypes.GET_TRANSACTIONS_START:
      return {
        ...state,
        isLoading: true,
      };
    case TransactionsGraphTypes.GET_TRANSACTIONS_SUCCESS:
      const convertMoneyScale = action.payload.map(
        (transaction: TransactionType) => ({
          ...transaction,
          amountInCents: (transaction.amountInCents / 100).toFixed(2),
        }),
      );
      const sortedEntries = sortAsc(convertMoneyScale);
      return {
        ...state,
        transactions: sortedEntries,
        isLoading: false,
      };
    case TransactionsGraphTypes.GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
      };
    case TransactionsGraphTypes.FILTER_TRANSACTIONS:
      return state;

    default:
      return state;
  }
};

export default TransactionsGraphReducer;
