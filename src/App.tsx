import React from 'react';
import './App.css';
import TransactionsGraph from './components/transactions-graph/transactions-graph.component';
import {TransactionsGraphProvider} from './context/transactions-graph';
import {Layout} from 'antd';

const {Header, Footer, Content} = Layout;

function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <div className="App">
          <TransactionsGraphProvider>
            <TransactionsGraph />
          </TransactionsGraphProvider>
        </div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
