import React, {createContext, useReducer, useEffect, useMemo} from 'react';
import TransactionsGraphReducer from './transactions-graph.reducer';
import {TransactionType, TeamType, TagType} from '../../types';
import * as TransactionsGraphTypes from './transactions-graph.types';
import {wrapAsync} from '../utils';
import {getTransactionsStartAsync} from './transactions-graph.actions';

type initialStateProps = {
  transactions: Array<TransactionType>;
  teams: Array<TeamType>;
  tags: Array<TagType>;
  filterTransactions: (filterOptions: Array<TransactionType>) => void;
  isLoading: boolean;
  errorMessage: undefined;
};

const initialState: initialStateProps = {
  transactions: [],
  teams: [],
  tags: [],
  filterTransactions: filterOptions => {},
  isLoading: false,
  errorMessage: undefined,
};

export const TransactionsGraphContext = createContext(initialState);

type GlobalProviderProps = {
  children: React.ReactNode;
};

export const TransactionsGraphProvider = ({children}: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(TransactionsGraphReducer, initialState);
  const asyncDispatch = useMemo(() => wrapAsync(dispatch), [dispatch]);

  const filterTransactions = (filterOptions: TransactionType[]) => {
    return dispatch({
      type: TransactionsGraphTypes.FILTER_TRANSACTIONS,
      payload: filterOptions,
    });
  };

  useEffect(() => {
    asyncDispatch(getTransactionsStartAsync());
  }, [asyncDispatch]);

  return (
    <TransactionsGraphContext.Provider
      value={{
        transactions: state.transactions,
        teams: state.teams,
        tags: state.tags,
        filterTransactions,
        isLoading: state.isLoading,
        errorMessage: state.errorMessage,
      }}
    >
      {children}
    </TransactionsGraphContext.Provider>
  );
};
