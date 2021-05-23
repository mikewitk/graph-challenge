import {Layout} from 'antd';
import React from 'react';
import './App.css';
import TransactionsGraph from './components/transactions-graph/transactions-graph.component';
import {TransactionsGraphProvider} from './context/transactions-graph';

const {Content} = Layout;

function App() {
  return (
    <Layout>
      <Content>
        <div className="App">
          <TransactionsGraphProvider>
            <TransactionsGraph />
          </TransactionsGraphProvider>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
