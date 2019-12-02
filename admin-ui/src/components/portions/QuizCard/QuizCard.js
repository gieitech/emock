import React,{Component} from 'react';
import {Card,Badge} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

import './QuizCard.css';

class QuizCard extends Component{

    render = ()=>{
        const {quiz} = this.props;
        return(
            <Card>
                <NavLink to={`/quiz/${quiz.id}`}>
                    <Card.Img variant="top" src={quiz.cover_image_url} className='quiz-cover'/>
                </NavLink>
                <Card.Body>
                    
                    {
                        quiz.isActive 
                        ? <Card.Text className='quiz-active'>
                            This quiz is currenctly active 
                            </Card.Text>    
                        : <Card.Text className='quiz-inactive'>
                            This quiz is deactivated. 
                        </Card.Text>  
                    }
                    
                    <Card.Title><NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink> <Badge variant='warning'>{quiz.full_marks} Mark{quiz.full_marks>1 && 's'}</Badge></Card.Title>
                    <Card.Text><i className="fa fa-clock-o" aria-hidden="true"></i> {quiz.allotted_time_in_minutes} Minutes</Card.Text>
                    <Card.Text className='quiz_pub-date'>Published on {new Date(quiz.pub_date).toDateString()}</Card.Text>
                    <Card.Text>
                        {quiz.syllabus}
                    </Card.Text>
                    
                </Card.Body>
                
            </Card>
        )
    }
}

export default QuizCard;
