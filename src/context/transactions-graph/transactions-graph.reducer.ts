import * as TransactionsGraphTypes from './transactions-graph.types';

const TransactionsGraphReducer = (state, action) => {
  switch (action.type) {
    case TransactionsGraphTypes.FILTER_TRANSACTIONS:
      return state;

    default:
      return state;
  }
};

export default TransactionsGraphReducer;
