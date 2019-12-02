import React,{Component} from 'react';
import {Container,Row,Col} from 'react-bootstrap';

import './QuestionForm.css';


class QuestionForm extends Component{

    render = ()=>{
        const {match : {params : {questionId,},},} = this.props;
        return(
            <Row>
                <Col>
                    <h1>Question Form {questionId}</h1>
                </Col>
            </Row> 
        );
    }
}

export default QuestionForm;