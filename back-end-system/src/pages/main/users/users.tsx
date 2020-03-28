import React, { useState } from 'react';
import { withRouter } from 'react-router';
import './users.scss';
import { Table, Tag, Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (text: string) => <a href="/">{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
    render: (tags: any[]) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: any) => (
      <span>
        <Button type="primary" style={{ marginRight: 16 }}>
          Edit
        </Button>
        <Button type="primary" style={{ marginRight: 16, background: '#52c41a', border: '1px solid #52c41a' }}>Reset Password</Button>
        <Button type="primary" danger>Delete</Button>
      </span>
    ),
  },
];

const Users = (props: RouteComponentProps) => {
  const [data, setData] = useState([
    {
      key: '1',
      username: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      type: ['nice', 'developer'],
    },
    {
      key: '2',
      username: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      type: ['loser'],
    },
    {
      key: '3',
      username: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      type: ['cool', 'teacher'],
    },
  ]);

  const handleAdd = () => {
    props.history.push('/main/details');
    // const newData = {
    //   key: '1',
    //   name: 'John Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    //   tags: ['nice', 'developer'],
    // };

    // setData([...data, newData]);
  };

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add user
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default withRouter(Users);
