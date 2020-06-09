import React, { useEffect } from 'react';
import {
  Form, Input, Button, Radio,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';

import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { observer } from 'mobx-react';
import useStores from '../../utils/useStores';

const EXCHANGE_RATES = gql`
  query doLogin($username: String!, $password: String!, $type: Float!) {
    login(username: $username, password: $password, type: $type) {
      token
    }
  }
`;

const Login = observer(() => {
  const [login, { error, data: res }] = useLazyQuery(EXCHANGE_RATES);
  const { userStore } = useStores();

  useEffect(() => {
    console.log(error, res);
  }, [error, res]);

  const onFinish = (values: any) => {
    // console.log(values);
    login({
      variables: {
        username: values.username,
        password: values.password,
        type: values.type,
      },
    });
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-main">
          <Form onFinish={onFinish} className="login-form">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Radio.Group>
                <Radio.Button value={0}>普通用户</Radio.Button>
                <Radio.Button value={1}>管理员</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
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
});
export default withRouter(Login);
