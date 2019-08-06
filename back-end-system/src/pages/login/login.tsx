import { Button, Checkbox, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

import * as React from 'react'

import './login.css'

class Login extends React.Component<FormComponentProps, {}> {
  public handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    this.props.form.validateFields(
      (err, values): void => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      }
    )
  };

  public render (): JSX.Element {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='login'>
        <div className='login-container'>
          <div className='login-main'>
            <Form onSubmit={this.handleSubmit} className='login-form'>
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your username!'
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type='user'
                        style={{ color: 'rgba(0,0,0,.25)' }}
                      />
                    }
                    placeholder='Username'
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Password!'
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type='lock'
                        style={{ color: 'rgba(0,0,0,.25)' }}
                      />
                    }
                    type='password'
                    placeholder='Password'
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  initialValue: true,
                  valuePropName: 'checked'
                })(<Checkbox>Remember me</Checkbox>)}
                <div className='login-form-forgot'>Forgot password</div>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  Log in
                </Button>
                Or <Button href=''>register now!</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Form.create<FormComponentProps>()(Login)
