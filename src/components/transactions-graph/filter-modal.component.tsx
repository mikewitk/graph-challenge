import {Modal, Select, DatePicker} from 'antd';
import React, {FC, useContext} from 'react';
import {TransactionsGraphContext} from '../../context/transactions-graph';

const {Option} = Select;
const {RangePicker} = DatePicker;

const CalendarContainer = {
  width: '300px',
  border: '1px solid #f0f0f0',
  borderRadius: '2px',
};

type FilterModalProps = {
  toggleModal: () => void;
};

const FilterModal: FC<FilterModalProps> = ({toggleModal}) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const {tags, teams} = useContext(TransactionsGraphContext);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      toggleModal();
    }, 2000);
  };

  const handleCancel = () => {
    toggleModal();
  };

  const tagOptions = [];
  for (let i = 0; i < tags.length; i++) {
    tagOptions.push(
      <Option key={i.toString(36) + i} value={tags[i].tag}>
        {tags[i].tag}
      </Option>,
    );
  }

  const teamOptions = [];
  for (let i = 0; i < teams.length; i++) {
    teamOptions.push(
      <Option key={i.toString(36) + i} value={teams[i].team}>
        {teams[i].team}
      </Option>,
    );
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function onDateChange(value, mode) {
    console.log(value, mode);
  }

  return (
    <>
      <Modal
        title="Title"
        visible={true}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div style={CalendarContainer}>
          <RangePicker onChange={onDateChange} />
        </div>
        <Select
          mode="multiple"
          allowClear
          style={{width: '100%'}}
          placeholder="Please select"
          onChange={handleChange}
        >
          {tagOptions}
        </Select>
        <Select
          mode="multiple"
          allowClear
          style={{width: '100%'}}
          placeholder="Please select"
          onChange={handleChange}
        >
          {teamOptions}
        </Select>
      </Modal>
    </>
  );
};

export default FilterModal;
