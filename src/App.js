import React from 'react';
import Register from './pages/Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Register} path="/" />
        <Route exact component={Landing} path="/users" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
