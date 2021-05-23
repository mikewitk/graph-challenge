import {TransactionType} from '../../types';
import * as TransactionsGraphTypes from './transactions-graph.types';
import {sortAsc, filterTransactionsByQuery} from '../utils';

const TransactionsGraphReducer = (state, action) => {
  switch (action.type) {
    case TransactionsGraphTypes.GET_TRANSACTIONS_START:
      return {
        ...state,
        isLoadingTransactions: true,
      };
    case TransactionsGraphTypes.GET_TRANSACTIONS_SUCCESS:
      const convertMoneyScale = action.payload.map(
        (transaction: TransactionType) => ({
          ...transaction,
          amountInCents: parseFloat(
            (transaction.amountInCents / 100).toFixed(2),
          ),
        }),
      );
      const sortedEntries = sortAsc(convertMoneyScale);
      return {
        ...state,
        transactions: sortedEntries,
        isLoadingTransactions: false,
      };
    case TransactionsGraphTypes.GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isLoadingTransactions: false,
      };
    case TransactionsGraphTypes.GET_TAGS_START:
      return {
        ...state,
        isLoadingTags: true,
      };
    case TransactionsGraphTypes.GET_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload,
        isLoadingTags: false,
      };
    case TransactionsGraphTypes.GET_TAGS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isLoadingTags: false,
      };
    case TransactionsGraphTypes.GET_TEAMS_START:
      return {
        ...state,
        isLoadingTeams: true,
      };
    case TransactionsGraphTypes.GET_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.payload,
        isLoadingTeams: false,
      };
    case TransactionsGraphTypes.GET_TEAMS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isLoadingTeams: false,
      };
    case TransactionsGraphTypes.FILTER_TRANSACTIONS:
      const filteredTransactions = filterTransactionsByQuery(
        state.transactions,
        action.payload,
      );

      return {
        ...state,
        selectedFilters: action.payload,
        transactions: filteredTransactions,
      };

    case TransactionsGraphTypes.TOGGLE_FILTER_MODAL:
      return {
        ...state,
        isFilterModalOpen: !state.isFilterModalOpen,
      };
    default:
      return state;
  }
};

export default TransactionsGraphReducer;
