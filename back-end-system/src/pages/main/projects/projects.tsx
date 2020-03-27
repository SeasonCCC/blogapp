import React, { useState } from 'react';
import { withRouter } from 'react-router';
import './projects.scss';
import { Table, Tag, Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

const columns = [
  {
    title: 'Title',
    dataIndex: 'name',
    key: 'name',
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
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
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
        <a href="/" style={{ marginRight: 16 }}>
          Invite
          {' '}
          {record.name}
        </a>
        <a href="/">Delete</a>
      </span>
    ),
  },
];

const Projects = (props: RouteComponentProps) => {
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
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
        Add a row
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default withRouter(Projects);
