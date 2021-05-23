import React, {useContext} from 'react';
import {TransactionsGraphContext} from '../../context/transactions-graph';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

const TransactionsGraph = () => {
  const {transactions} = useContext(TransactionsGraphContext);

  return (
    <div>
      This is a graph
      <LineChart width={1000} height={600} data={transactions}>
        <Line type="monotone" dataKey="amountInCents" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="id" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default TransactionsGraph;
