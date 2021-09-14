import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const Landing = () => {
  const history = useHistory();
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const currentUser = localStorage.getItem('current-user');
  useEffect(() => {
    if (!users.length) {
      history.push('/');
    }
    if (!currentUser) {
      history.push('/');
    }
  }, [currentUser, history, users.length]);

  const handleClickLogout = () => {
    localStorage.setItem('current-user', '');
    history.push('/');
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
        <h2>Registered Users</h2>
        <ul>
          {users.length > 0 &&
            users.map((user) => (
              <li key={`${user.username}-${user.email}`}>{user.username}</li>
            ))}
        </ul>
        <button onClick={handleClickLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Landing;
