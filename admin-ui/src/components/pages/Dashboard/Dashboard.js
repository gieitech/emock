import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';

class Dashboard extends Component{

    render=()=>{
        return(
            <h1>Admin Dashboard page</h1>
        );
    }
}

export default withRouter(Dashboard);