import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const Register = () => {
  const history = useHistory();
  const [username, SetUsername] = useState('');
  const [usernameWarning, SetUsernameWarning] = useState(true);
  const [mobile, SetMobile] = useState('');
  const [mobileWarning, SetMobileWarning] = useState(true);
  const [email, SetEmail] = useState('');
  const [emailWarning, SetEmailWarning] = useState(true);
  const [password, SetPassword] = useState('');
  const [passwordWarning, SetPasswordWarning] = useState(true);
  const [confirmPassword, SetConfirmPassword] = useState('');
  const [isReg, SetIsReg] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      mobile,
      email,
      password,
      confirmPassword
    };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length > 0) {
      if (users.some((item) => item.username === username)) return;
    }
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
    SetIsReg(false);
  };
  const handleChangeUsername = (value) => {
    const usernameRegex = /^[a-zA-Z\s]*$/;
    SetUsernameWarning(usernameRegex.test(value));
    SetUsername(value);
  };
  const handleChangeEmail = (value) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    SetEmailWarning(emailRegex.test(value));
    SetEmail(value);
  };
  const handleChangePassword = (value) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    SetPasswordWarning(passwordRegex.test(value));
    SetPassword(value);
  };
  const handleChangeMobile = (value) => {
    const mobileRegex = /^\d{10}$/;
    SetMobileWarning(mobileRegex.test(value));
    SetMobile(value);
  };
  useEffect(() => {
    if (!username) SetUsernameWarning(true);
    if (!mobile) SetMobileWarning(true);
    if (!email) SetEmailWarning(true);
    if (!password) SetPasswordWarning(true);
  }, [email, mobile, password, username]);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users'));
    console.log(users);
  }, []);
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some((item) => item.username === username)) {
      history.push('/users');
      localStorage.setItem('current-user', username);
    }
  };
  return (
    <div>
      <div className="img">
        <img
          className="bg-image"
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80"
          alt=""
        />
      </div>
      <div className="register">
        {isReg ? (
          <form onSubmit={handleSubmit} className="form">
            <h5>Welcome Back</h5>
            <small>Please Login to your account</small>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                required
                onChange={(e) => handleChangeUsername(e.target.value)}
              />
              {!usernameWarning && (
                <small className="warning">
                  Only Letters and Spaces are allowed
                </small>
              )}
              <input
                type="number"
                placeholder="Mobile"
                value={mobile}
                required
                onChange={(e) => handleChangeMobile(e.target.value)}
              />
              {!mobileWarning && (
                <small className="warning">
                  Mobile number should contain only 10 digits
                </small>
              )}
              <input
                type="email"
                placeholder="Email Id"
                value={email}
                required
                onChange={(e) => handleChangeEmail(e.target.value)}
              />
              {!emailWarning && (
                <small className="warning">Please Enter the Valid Email</small>
              )}
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => handleChangePassword(e.target.value)}
              />
              {!passwordWarning && (
                <small className="warning">
                  Password should contain letter, caps Letter, special
                  Character, number, and atleast 8 Characters
                </small>
              )}
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                required
                onChange={(e) => SetConfirmPassword(e.target.value)}
              />
              {confirmPassword && password !== confirmPassword && (
                <small className="warning">
                  password and confirm password should match
                </small>
              )}
            </div>
            <button className="btn-reg">Register</button>
            <small>
              Already have account{' '}
              <button className="login-here" onClick={() => SetIsReg(!isReg)}>Login Here</button>
            </small>
          </form>
        ) : (
          <form onSubmit={handleSubmitLogin} className="form">
            <h5>Welcome Back</h5>
            <small>Please Login to your account</small>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                required
                onChange={(e) => handleChangeUsername(e.target.value)}
              />
              {!usernameWarning && (
                <small className="warning">
                  Only Letters and Spaces are allowed
                </small>
              )}

              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => handleChangePassword(e.target.value)}
              />
              {!passwordWarning && (
                <small className="warning">
                  Password should contain letter, caps Letter, special
                  Character, number, and atleast 8 Characters
                </small>
              )}
            </div>
            <div className="remember">
              <div className="rem-me">
                <input type="checkbox" />
                <small>Remember me</small>
              </div>
              <small className="for-pas">Forgot Password</small>
            </div>
            <button className="btn-reg">Login</button>
          </form>
        )}
      </div>
      <small className="terms">Terms of use. Privacy Policy</small>
    </div>
  );
};

export default Register;
