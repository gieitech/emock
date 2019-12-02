import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Row,Col,Alert} from 'react-bootstrap';

import {fetchQuizes} from '../../../redux/Quiz/Quiz.actions';
import {Spinner} from 'react-bootstrap';

import './Quizes.css';

// getting portions
import QuizCard from '../../portions/QuizCard/QuizCard';
import CreateQuiz from '../../portions/CreateQuiz/CreateQuiz';

class Quizes extends Component{

    componentDidMount = ()=>{
        const {fetchQuizes} = this.props;
        fetchQuizes();
    }

    render=()=>{
        const {Quizes,fetching} = this.props;
       
        
        if(fetching){
            return(
                <Spinner animation="grow" size="lg" className="quizloader"/>
            )
        }else{
            return (
                <Row style={{padding:'1em 1em 0 1em'}}>
                    {
                        Quizes ? Quizes.map((quiz,i)=>{
                            return(
                                <Col md={3} key={i}>
                                    <QuizCard quiz={quiz} />
                                    <br/>
                                </Col>
                            )
                        })
                        : <Alert variant="danger">Something went wrong.</Alert>
                    }
                    <CreateQuiz />
                </Row>
            )
        }
    }
}

const mapStateToProps = ({quiz})=>({
    Quizes : quiz.Quizes,
    fetching : quiz.fetching,
});

const mapDispatchToProps = dispatch =>({
    fetchQuizes : ()=> dispatch(fetchQuizes())
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Quizes));