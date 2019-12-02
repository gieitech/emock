import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Spinner,Alert,Row,Col,Card,ListGroup,ListGroupItem,Badge} from 'react-bootstrap';

import {fetchSingleQuiz} from '../../../redux/Quiz/Quiz.actions';
import {fetchAllQuestions} from '../../../redux/Question/Question.actions';



import Questions from '../../portions/Questions/Questions';
import CreateQuestion from '../../portions/CreateQuestion/CreateQuestion';

// importing portions
import UpdateQuestion from '../../portions/UpdateQuestion/UpdateQuestion';

import './QuizDetail.css';

class QuizDetail extends Component{

    componentDidMount = ()=>{
        const {match : {params : {id},} ,fetchSingleQuiz,fetchAllQuestions} = this.props;
        fetchSingleQuiz(id);
        fetchAllQuestions(id);
    }

    render = ()=>{
        const {
            singleQuiz,
            fetching,
            match,
            allQuestions,
            fetchingQuestions,
            
        } = this.props;
        if(fetching){
            return <Spinner animation="grow" size="lg" className="singleQuizloader"/>
        }
        
        return (
            
                singleQuiz
                ? <div className='quiz-details'>
                    <Row>
                        <Col md={3} className='quiz-info'>
                            {
                                fetching 
                                    ? <Spinner animation="grow" size="lg" className="singleQuizloader"/>
                                    :<Card >
                                        <Card.Img variant="top" src={singleQuiz.cover_image_url} />
                                        <Card.Body>
                                            <Card.Title>{singleQuiz.name} <Badge variant="info">{singleQuiz.full_marks} Mark{singleQuiz.full_marks > 1 && 's'}</Badge></Card.Title>
                                            <Card.Text>
                                                {singleQuiz.syllabus}
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem><i className="fa fa-clock-o" aria-hidden="true"></i> {singleQuiz.allotted_time_in_minutes} Minutes | {singleQuiz.no_of_questions} Question{singleQuiz.no_of_questions > 1 && 's'}</ListGroupItem>
                                            {singleQuiz.negative_marking && <ListGroupItem className='text-warning'>Negative Marking</ListGroupItem>}
                                            <ListGroupItem className={singleQuiz.isActive ? "text-info" : "text-success"}>{singleQuiz.isActive ? "Activated" : "Not Activated"}</ListGroupItem>
                                        </ListGroup>
                                        <Card.Body>
                                            <Card.Link href="#">Update Quiz</Card.Link>
                                            <Card.Link href="#">Delete Quiz</Card.Link>
                                        </Card.Body>
                                    </Card>
                            }
                        </Col>
                        <Col md={9} className='questions-list'>
                            {
                                fetchingQuestions 
                                    ? <Spinner animation="grow" size="lg" className="singleQuizloader"/>
                                    : allQuestions && <Questions Questions={allQuestions} /> 
                            }
                             
                                
                        </Col>
                        <CreateQuestion quizId={match.params.id} />
                        <UpdateQuestion />
                    </Row>


                 </div>
                : <Alert variant="danger">Something went wrong.</Alert>
            
        );
    }
}

const mapStateToProps = ({quiz : {singleQuiz,fetching},question})=>({
    singleQuiz,
    fetching,

    allQuestions : question.allQuestions,
    fetchQuestionsError : question.fetchQuestionsError,
    fetchingQuestions : question.fetchingQuestions,
});

const mapDispatchToProps = dispatch =>({
    fetchSingleQuiz : (quiz_id)=>dispatch(fetchSingleQuiz(quiz_id)),
    fetchAllQuestions : (quiz_id)=>dispatch(fetchAllQuestions(quiz_id)),
    
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,

)(QuizDetail));