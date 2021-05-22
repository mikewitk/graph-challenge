import React from 'react';
import './App.css';
import TransactionsGraph from './components/transactions-graph/transactions-graph.component';

function App() {
  return (
    <div className="App">
      <p>Transactions</p>
      <TransactionsGraph />
    </div>
  );
}

export default App;
