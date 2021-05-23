import {Col, Row, Typography, Button} from 'antd';
import React, {useContext, useState} from 'react';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {TransactionsGraphContext} from '../../context/transactions-graph';
import ModalFilteringOptions from './filter-modal.component';
import {FilterFilled} from '@ant-design/icons';

const {Title} = Typography;

const TransactionsGraph = () => {
  const {transactions, totalSpent} = useContext(TransactionsGraphContext);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <div>
      <Row>
        <Col span={4}>
          <Title level={5}>Spent</Title>
          <Title level={4}>${totalSpent}</Title>
        </Col>
        <Col span={4} offset={8}>
          <Button
            type="primary"
            shape="circle"
            icon={<FilterFilled />}
            onClick={toggleModal}
          />
        </Col>
        {showModal && <ModalFilteringOptions toggleModal={toggleModal} />}
      </Row>
      <LineChart width={1000} height={600} data={transactions}>
        <Line type="monotone" dataKey="amountInCents" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default TransactionsGraph;
