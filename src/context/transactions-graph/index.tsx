import React, {createContext, useReducer} from 'react';
import TransactionsGraphReducer from './transactions-graph.reducer';
import {TransactionType, TeamType, TagType} from '../../types';
import * as TransactionsGraphTypes from './transactions-graph.types';

type initialStateProps = {
  transactions: Array<TransactionType>;
  teams: Array<TeamType>;
  tags: Array<TagType>;
  filterTransactions: (filterOptions: Array<TransactionType>) => void;
};

const initialState: initialStateProps = {
  transactions: [],
  teams: [],
  tags: [],
  filterTransactions: filterOptions => {},
};

export const GlobalContext = createContext(initialState);

type GlobalProviderProps = {
  children: React.ReactNode;
};

export const GlobalProvider = ({children}: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(TransactionsGraphReducer, initialState);

  const filterTransactions = (filterOptions: TransactionType[]) => {
    return dispatch({
      type: TransactionsGraphTypes.FILTER_TRANSACTIONS,
      payload: filterOptions,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        teams: state.teams,
        tags: state.tags,
        filterTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
