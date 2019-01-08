import { Button, Checkbox, Form, Icon, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";

import "./login.css";

// interface IUserFormProps extends FormComponentProps {
//   getFieldDecorator: (id: string, options: any) => any;
//   validateFields: (err: string, values: any) => any;
// }

class Login extends React.Component<{} & FormComponentProps, {}> {
  public render() {
    // return (
    //   <div className="login">
    //     <div className="login-container">
    //       <div className="login-main">
    //         <div className="login-scroll">
    //           <div className="login-tabs">
    //             <div className="tab active">账户密码登录</div>
    //             <div className="tab">手机号登录</div>
    //             <div className="tabs-bar" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
    // const { form } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            initialValue: true,
            valuePropName: "checked"
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  }
  private handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // console.log("Received values of form: ", values);
      }
    });
  };
}

export default Form.create<FormComponentProps>()(Login);
// export default Login;
