import React, {createContext, useReducer, useEffect, useMemo} from 'react';
import TransactionsGraphReducer from './transactions-graph.reducer';
import {TransactionType, TeamType, TagType} from '../../types';

import {wrapAsync, sumTotal} from '../utils';
import {
  getTransactionsStartAsync,
  getTagsStartAsync,
  getTeamsStartAsync,
  getFilteredTransactions,
  getFilteredTransactionsAsync,
} from './transactions-graph.actions';

export type selectedFilterProps = {
  startDate: any;
  endDate: any;
  tag: string | undefined;
  team: string | undefined;
};

type initialStateProps = {
  transactions: Array<TransactionType>;
  teams: Array<TeamType>;
  tags: Array<TagType>;
  filterTransactions: (filterOptions: selectedFilterProps) => void;
  isLoadingTransactions: boolean;
  errorMessage: undefined;
  totalSpent: number;
  isLoadingTags: boolean;
  isLoadingTeams: boolean;
  selectedFilters: selectedFilterProps;
};

const initialState: initialStateProps = {
  transactions: [],
  teams: [],
  tags: [],
  filterTransactions: filterOptions => {},
  isLoadingTransactions: false,
  errorMessage: undefined,
  totalSpent: 0,
  isLoadingTags: false,
  isLoadingTeams: false,
  selectedFilters: {
    startDate: new Date(),
    endDate: new Date(),
    tag: undefined,
    team: undefined,
  },
};

export const TransactionsGraphContext = createContext(initialState);

type GlobalProviderProps = {
  children: React.ReactNode;
};

export const TransactionsGraphProvider = ({children}: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(TransactionsGraphReducer, initialState);
  const asyncDispatch = useMemo(() => wrapAsync(dispatch), [dispatch]);
  const totalSpent = useMemo(
    () => parseFloat(sumTotal(state.transactions)),
    [state.transactions],
  );

  const filterTransactions = (filterOptions: selectedFilterProps) => {
    return asyncDispatch(getFilteredTransactionsAsync(filterOptions));
  };

  useEffect(() => {
    asyncDispatch(getTransactionsStartAsync());
    asyncDispatch(getTagsStartAsync());
    asyncDispatch(getTeamsStartAsync());
  }, [asyncDispatch]);

  return (
    <TransactionsGraphContext.Provider
      value={{
        transactions: state.transactions,
        teams: state.teams,
        tags: state.tags,
        filterTransactions,
        isLoadingTransactions: state.isLoadingTransactions,
        errorMessage: state.errorMessage,
        totalSpent,
        isLoadingTags: state.isLoadingTags,
        isLoadingTeams: state.isLoadingTeams,
        selectedFilters: state.selectedFilters,
      }}
    >
      {children}
    </TransactionsGraphContext.Provider>
  );
};
