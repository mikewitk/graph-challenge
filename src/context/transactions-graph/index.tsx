import React, {createContext, useReducer, useEffect} from 'react';
import TransactionsGraphReducer from './transactions-graph.reducer';
import {TransactionType, TeamType, TagType} from '../../types';
import * as TransactionsGraphTypes from './transactions-graph.types';
import {Transaction} from '../../api';

type initialStateProps = {
  transactions: Array<TransactionType>;
  teams: Array<TeamType>;
  tags: Array<TagType>;
  filterTransactions: (filterOptions: Array<TransactionType>) => void;
  // getTransactions: () => void;
};

const initialState: initialStateProps = {
  transactions: [],
  teams: [],
  tags: [],
  filterTransactions: filterOptions => {},
  // getTransactions: () => {};
};

export const TransactionsGraphContext = createContext(initialState);

type GlobalProviderProps = {
  children: React.ReactNode;
};

export const TransactionsGraphProvider = ({children}: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(TransactionsGraphReducer, initialState);

  const getTransactions = async () => {
    const result = await Transaction.getTransactions();
    return dispatch({
      type: TransactionsGraphTypes.SET_TRANSACTIONS,
      payload: result,
    });
  };

  const filterTransactions = (filterOptions: TransactionType[]) => {
    return dispatch({
      type: TransactionsGraphTypes.FILTER_TRANSACTIONS,
      payload: filterOptions,
    });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <TransactionsGraphContext.Provider
      value={{
        transactions: state.transactions,
        teams: state.teams,
        tags: state.tags,
        filterTransactions,
      }}
    >
      {children}
    </TransactionsGraphContext.Provider>
  );
};
