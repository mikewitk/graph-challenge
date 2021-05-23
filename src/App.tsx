import React from 'react';
import './App.css';
import TransactionsGraph from './components/transactions-graph/transactions-graph.component';
import {TransactionsGraphProvider} from './context/transactions-graph';

function App() {
  return (
    <div className="App">
      <TransactionsGraphProvider>
        <TransactionsGraph />
      </TransactionsGraphProvider>
    </div>
  );
}

export default App;
