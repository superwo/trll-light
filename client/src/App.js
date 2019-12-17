import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './resources/styles.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Boards from './layout/Boards';
import Login from './layout/Login';

function App() {
  return (
    <div className='mainLayout'>
      <Header />
      <main>
        <Switch>
          <Route path='/' exact component={Boards} />
          <Route path='/login' component={Login} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
