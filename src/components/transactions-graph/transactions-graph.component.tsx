import {FilterFilled} from '@ant-design/icons';
import {Button, Col, Row, Typography} from 'antd';
import React, {useContext} from 'react';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {TransactionsGraphContext} from '../../context/transactions-graph';
import ModalFilteringOptions from './filter-modal.component';

const {Title} = Typography;

const TransactionsGraph = () => {
  const {
    isFilterModalOpen,
    toggleFilterModalHandler,
    totalSpent,
    transactions,
  } = useContext(TransactionsGraphContext);

  return (
    <>
      <Row justify="space-between" align="bottom">
        <Col span={4} offset={2}>
          <Title level={5}>Spent</Title>
          <Title level={4}>${totalSpent}</Title>
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            shape="circle"
            icon={<FilterFilled />}
            onClick={toggleFilterModalHandler}
          />
        </Col>
        {isFilterModalOpen && <ModalFilteringOptions />}
      </Row>
      <LineChart width={1000} height={600} data={transactions}>
        <Line
          type="monotone"
          dataKey="amountInCents"
          stroke="#373479"
          strokeWidth={2}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </>
  );
};

export default TransactionsGraph;
