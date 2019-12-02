import React,{Component} from 'react';
import {connect} from 'react-redux';

import {fetchQuizes} from '../../../redux/Quiz/Quiz.actions';
import './Login.css';



class Login extends Component{

    

    render = ()=>{
        return(
            <h1>Login Page</h1>
        )
        
    }
}

   


export default Login;
