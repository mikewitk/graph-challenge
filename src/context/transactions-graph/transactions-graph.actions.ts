import * as TransactionsGraphType from './transactions-graph.types';
import {TagType, TeamType, TransactionType} from '../../types';
import {Transaction, Tags, Teams} from '../../api';
import {selectedFilterProps} from './index';

/*
 Async/Await on this file were left since it's possible to change how the data is retrieved on api.ts file
*/

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
  return async (dispatch: any) => {
    dispatch(getTransactionsStart());
    try {
      const transactions = await Transaction.getTransactions();
      dispatch(getTransactionsSuccess(transactions));
    } catch (error) {
      dispatch(getTransactionsFailure(error.message));
    }
  };
};

export const getTagsStart = () => ({
  type: TransactionsGraphType.GET_TAGS_START,
});

export const getTagsSuccess = (tags: Array<TagType>) => ({
  type: TransactionsGraphType.GET_TAGS_SUCCESS,
  payload: tags,
});

export const getTagsFailure = (errorMessage: string) => ({
  type: TransactionsGraphType.GET_TAGS_FAILURE,
  payload: errorMessage,
});

export const getTagsStartAsync = () => {
  return async (dispatch: any) => {
    dispatch(getTagsStart());
    try {
      const tags = await Tags.getTags();
      dispatch(getTagsSuccess(tags));
    } catch (error) {
      dispatch(getTransactionsFailure(error.message));
    }
  };
};

export const getTeamsStart = () => ({
  type: TransactionsGraphType.GET_TEAMS_START,
});

export const getTeamsSuccess = (teams: Array<TeamType>) => ({
  type: TransactionsGraphType.GET_TEAMS_SUCCESS,
  payload: teams,
});

export const getTeamsFailure = (errorMessage: string) => ({
  type: TransactionsGraphType.GET_TEAMS_FAILURE,
  payload: errorMessage,
});

export const getTeamsStartAsync = () => {
  return async (dispatch: any) => {
    dispatch(getTeamsStart());
    try {
      const teams = await Teams.getTeams();
      dispatch(getTeamsSuccess(teams));
    } catch (error) {
      dispatch(getTeamsFailure(error.message));
    }
  };
};

export const getFilteredTransactions = (
  filterOptions: selectedFilterProps,
) => ({
  type: TransactionsGraphType.FILTER_TRANSACTIONS,
  payload: filterOptions,
});

export const getFilteredTransactionsAsync = (
  filterOptions: selectedFilterProps,
) => {
  return async (dispatch: any) => {
    dispatch(getTransactionsStart());
    try {
      const transactions = await Transaction.getTransactions();
      dispatch(getTransactionsSuccess(transactions));
      dispatch(getFilteredTransactions(filterOptions));
      dispatch(toggleFilterModal());
    } catch (error) {
      dispatch(getTransactionsFailure(error.message));
      dispatch(toggleFilterModal());
    }
  };
};

export const toggleFilterModal = () => ({
  type: TransactionsGraphType.TOGGLE_FILTER_MODAL,
});
