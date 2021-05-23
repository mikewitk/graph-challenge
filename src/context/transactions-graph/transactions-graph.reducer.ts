import * as TransactionsGraphTypes from './transactions-graph.types';

const TransactionsGraphReducer = (state, action) => {
  switch (action.type) {
    case TransactionsGraphTypes.SET_TRANSACTIONS:
      const convertMoneyScale = action.payload.map(transaction => ({
        ...transaction,
        amountInCents: (transaction.amountInCents / 100).toFixed(2),
      }));
      return {
        ...state,
        transactions: [...convertMoneyScale],
      };
    case TransactionsGraphTypes.FILTER_TRANSACTIONS:
      return state;

    default:
      return state;
  }
};

export default TransactionsGraphReducer;
