import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './resources/styles.css';
import Header from './layout/Header';
import Boards from './layout/Boards';
import Login from './layout/Login';
import CardPage from './layout/CardPage';
import Register from './layout/Register';
import { UserProvider } from './contexts/userContext';
import PrivateRoute from './hoc/PrivateRoute';
import CreateBoard from './components/CreateBoard';

function App() {
  return (
    <UserProvider>
      <div className='mainLayout'>
        <Header />
        <CreateBoard />
        <main className='main-section'>
          <Switch>
            <PrivateRoute path='/' exact component={Boards} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/card/:id' component={CardPage} />
          </Switch>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
