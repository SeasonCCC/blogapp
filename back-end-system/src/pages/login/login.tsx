import React, { useEffect } from 'react';
import {
  Form, Input, Button,
} from 'antd';
import { withRouter } from 'react-router';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';

import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';

const EXCHANGE_RATES = gql`
  query doLogin ($username: String!, $password: String!, $type: Float!){
    login(username: $username, password: $password, type: $type) {
      id
      username
      password
      type
      createTime
      updateTime
      token
    }
  }`;

const Login = () => {
  const [
    login,
    { error, data },
  ] = useLazyQuery(EXCHANGE_RATES);

  if (data) {
    console.log(data);
  }

  // useEffect(() => {
  //   console.log(loading, error, data);
  // }, [loading, error, data]);

  const onFinish = (values: any) => {
    login({ variables: { username: values.username, password: values.password, type: 1 } });
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-main">
          <Form onFinish={onFinish} className="login-form">
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item> */}

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>

            {/* <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ],
              })(
                <Input
                  prefix={(
                    <Icon
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  )}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                initialValue: true,
                valuePropName: 'checked',
              })(<Checkbox>Remember me</Checkbox>)}
              <div className="login-form-forgot">Forgot password</div>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or
              {' '}
              <Button href="">register now!</Button>
            </Form.Item> */}
          </Form>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Login);
