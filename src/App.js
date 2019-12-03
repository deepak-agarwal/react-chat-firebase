import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './components/auth/login/login';
import Register from './components/auth/register/regstier';
import Chat from './components/home';
import {auth} from './components/firebase'


function App() {
  return (
      <BrowserRouter>
      <Switch >
      <Route path='/login' exact component={Login}/>
      <Route path='/' exact component={Register}/>
      <Route path='/home' component={Chat} />
      <Route path='/' component={()=>(<div>404 Not found</div>)}/>
      </Switch>
      </BrowserRouter>
  );
}

export default App;
