import React from 'react';
import {TransactionsGraphProvider} from '../../context/transactions-graph';
const TransactionsGraph = () => {
  return (
    <TransactionsGraphProvider>
      This is a graph
      <p>Very cool graph</p>
    </TransactionsGraphProvider>
  );
};

export default TransactionsGraph;
