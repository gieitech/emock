import React,{Component} from 'react';
import {connect} from 'react-redux';
import {NavLink,withRouter} from 'react-router-dom';
import {Col,Row,Card,ListGroup,ListGroupItem,Form,Button} from 'react-bootstrap';
import Interweave from 'interweave';
import './Questions.css';

// importing actions
import {setSelectedQuestion} from '../../../redux/Question/Question.actions';

class Questions extends Component{

    updateQuestion = (question)=>{
        const {setSelectedQuestion} = this.props;
        setSelectedQuestion(question);
    }

    render = ()=>{
        const {Questions,match} = this.props;

        return(
            <Row >
                {Questions.map((question,i)=>{
                    const {options} = question;
                    return(
                        
                            <Col md={6}  key={i}>
                                <Card className="single-question">
                                    <Card.Body>
                                        <Card.Title><Interweave content={question.question_text} /></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{question.marks} Mark{question.marks > 1 && 's'}</Card.Subtitle>
                                        <ListGroup className="list-group-flush">
                                            {options.map((option,j)=>{
                                                return(
                                                    <ListGroupItem key={j} className='option'>
                                                        <Form.Check
                                                            custom
                                                            inline
                                                            label={<Interweave content={option.option_text}/>}
                                                            type='checkbox'
                                                            id={`option-ckeckbox-${option.id}`}
                                                            checked={option.isCorrect}
                                                            onChange={this.optionChange}
                                                        />
                                                    </ListGroupItem>
                                                )
                                            })}
                                            
                                            
                                        </ListGroup>
                                        <br/>
                                        <Button variant='info' onClick={()=>this.updateQuestion(question)}>Update</Button>
                                        <Card.Link href="#">Delete</Card.Link>
                                    </Card.Body>
                                </Card>
                                <br/>
                            </Col>
                        
                    );
                })}
               
            </Row>
        );
    }
}

const mapDispatchToProps = dispatch=>({
    setSelectedQuestion : (question)=>dispatch(setSelectedQuestion(question)),
})

export default withRouter(connect(
    null,
    mapDispatchToProps,
)(Questions));