import * as React from 'react'
import { Table, Divider, Tag, Row, Card } from 'antd'

class Users extends React.Component {
  private readonly columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string): JSX.Element => <div>{text}</div>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any): JSX.Element => (
        <span>
          {tags.map(
            (tag: any): JSX.Element => {
              let color = tag.length > 5 ? 'geekblue' : 'green'
              if (tag === 'loser') {
                color = 'volcano'
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              )
            }
          )}
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any): JSX.Element => (
        <span>
          <div>Invite {record.name}</div>
          <Divider type='vertical' />
          <div>Delete</div>
        </span>
      )
    }
  ];

  private readonly data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ];

  public render (): JSX.Element {
    return (
      <Row gutter={16}>
        <Card>
          <Table columns={this.columns} dataSource={this.data} />
        </Card>
      </Row>
    )
  }
}

export default Users
