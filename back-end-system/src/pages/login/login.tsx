import React, { useState } from 'react';
import {
  Form, Input, Checkbox, Button,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';
// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

const Login = () => {
// const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  // const onFinishFailed = (errorInfo: string) => {
  //   console.log('Failed:', errorInfo);
  // };

  // const { form } = this.props;
  // const { getFieldDecorator } = form;
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
export default Login;
