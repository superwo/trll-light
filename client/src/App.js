import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './resources/styles.css';
import Header from './layout/Header';
import Boards from './layout/Boards';
import Login from './layout/Login';
import CardPage from './layout/CardPage';

function App() {
  return (
    <div className='mainLayout'>
      <Header />
      <main className='main-section'>
        <Switch>
          <Route path='/' exact component={Boards} />
          <Route path='/login' component={Login} />
          <Route path='/card/:id' component={CardPage} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
