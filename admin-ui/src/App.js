import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';

// importing pages
import Login from './components/auth/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Quizes from './components/pages/Quizes/Quizes';
import QuizDetail from './components/pages/QuizDetail/QuizDetail';

// importing portions
import NavBar from './components/portions/Navbar/NavBar';

class App extends Component{

  render = ()=>{
    return(
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/quizes' component={Quizes} />
          <Route exact path='/quiz/:id' component={QuizDetail} />
          
          
        </Switch>
      </Router>
    );
  }
}

export default App;
