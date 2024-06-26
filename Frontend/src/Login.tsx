import React from 'react';

// basic code implementation for fetch based on: https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples

class Login extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      loginSuccess: false,
      verifySuccess: false,
      token: null,
      errorMessage: null,
    };
  }

  submitLogin = async (event) => {
    // async added before event to allow for async fetch, may be unnecessary

    // testing with no backend
    /*
    this.setState({ username: event.target.username.value });
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    if (this.state.errorMessage == null) {
      this.setState({ loginSuccess: true });
    }
    */

    this.setState({ username: event.target.username.value });
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formJson),
    });
    const data = await response.json();

    this.setState({ loginSuccess: data.waitingForCode });
  };

  submitAuth = async (event) => {
    // testing with no backend
    /*
    const formJson = {
      username: this.state.username,
      code: event.target.code.value,
    };
    console.log(formJson);
    this.setState({ verifySuccess: true });
    */

    // custom json format, instead of direct copy of event form, so that previous username can be reused without prompting
    const formJson = {
      username: this.state.username,
      code: event.target.code.value,
    };

    const response = await fetch('http://localhost:3000/auth/verify2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formJson),
    });
    const data = await response.json();

    this.setState({ token: data.accessToken });
    this.setState({ verifySuccess: true }); // temp, removed when JWT implemented
  };

  render() {
    if (this.state.loginSuccess != true) {
      return (
        <div className="user login">
          <h2>Login</h2>

          <form className="userlogin" onSubmit={this.submitLogin}>
            <div className="username">
              <label>
                <input
                  placeholder="Username"
                  spellCheck="false"
                  name="username"
                  required
                  minLength={8}
                  maxLength={20}
                />
              </label>
            </div>

            <div className="password">
              <label>
                <input
                  placeholder="Password"
                  spellCheck="false"
                  name="password"
                  required
                  minLength={8}
                  maxLength={100}
                />
              </label>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      );
    } else if (this.state.verifySuccess != true) {
      return (
        <>
          <div className="2FA login">
            <p>
              You will have recieved an authentication code in your email (check
              spam). Enter it here:
            </p>
            <form className="authCode" onSubmit={this.submitAuth}>
              <label>
                <input
                  placeholder="Authentication Code"
                  spellCheck="false"
                  name="code"
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      );
    } else {
      return (
        <>
          You've been successfully logged in, {this.state.username}! Your token
          is <p>{this.state.token}</p>
        </>
      );
    }
  }
}

export default Login;