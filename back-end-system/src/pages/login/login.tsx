import * as React from "react";
import "./login.css";

// import loginBg from "src/assets/logo-bg.svg";

class Login extends React.Component {
  public render() {
    return (
      <div className="login">
        <div className="login-container">
          <div className="login-main">
            <div className="login-scroll">
              <div className="login-tabs">
                <div className="tab active">账户密码登录</div>
                <div className="tab">手机号登录</div>
                <div className="tabs-bar" />
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.tsx</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}

export default Login;
