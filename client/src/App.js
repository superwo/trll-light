import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import './resources/styles.css';
import Header from './layout/Header';
import BoardsContainer from './layout/BoardsContainer';
import Login from './layout/Login';
import CardPage from './layout/CardPage';
import Register from './layout/Register';
import { UserProvider } from './contexts/userContext';
import PrivateRoute from './hoc/PrivateRoute';
import CreateBoard from './components/CreateBoard';

function App() {
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  return (
    <UserProvider>
      <div className='mainLayout'>
        <Header setShowCreateBoard={setShowCreateBoard} />
        <CreateBoard
          show={showCreateBoard}
          toggleVisibility={setShowCreateBoard}
        />
        <main className='main-section'>
          <Switch>
            <PrivateRoute path='/' exact component={BoardsContainer} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/:id' component={CardPage} />
          </Switch>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
