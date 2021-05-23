import {Modal, Select, DatePicker} from 'antd';
import React, {FC, useContext, useState} from 'react';
import {TransactionsGraphContext} from '../../context/transactions-graph';
import moment from 'moment';

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
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {tags, teams, selectedFilters, filterTransactions} = useContext(
    TransactionsGraphContext,
  );
  const [filterSettings, setFilterSettings] = useState(selectedFilters);

  const handleOk = () => {
    setConfirmLoading(true);
    filterTransactions(filterSettings);
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

  function tagSelectHandler(value) {
    setFilterSettings({
      ...filterSettings,
      tag: value,
    });
  }
  function teamSelectHandler(value) {
    setFilterSettings({
      ...filterSettings,
      team: value,
    });
  }

  function onDateChange(value) {
    setFilterSettings({
      ...filterSettings,
      startDate: moment(value[0]),
      endDate: moment(value[1]),
    });
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
          <RangePicker
            onChange={onDateChange}
            value={[
              moment(filterSettings.startDate),
              moment(filterSettings.endDate),
            ]}
          />
        </div>
        <Select
          allowClear
          style={{width: '100%'}}
          placeholder="Please select"
          onChange={tagSelectHandler}
          value={filterSettings.tag}
        >
          {tagOptions}
        </Select>
        <Select
          allowClear
          style={{width: '100%'}}
          placeholder="Please select"
          onChange={teamSelectHandler}
          value={filterSettings.team}
        >
          {teamOptions}
        </Select>
      </Modal>
    </>
  );
};

export default FilterModal;
