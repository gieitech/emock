import React,{Component} from 'react';
import {Tab, Row,Col,Nav,FormControl,InputGroup,Alert,Table,Button,Badge} from 'react-bootstrap';
import {ToastContainer,toast} from 'react-toastify'
import  ReactCountdownClock from 'react-countdown-clock';

import './Examspace.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class Examspace extends Component{
    state={
        Answersheet : [],
        loading : false,
        Confirmed : [],
        
    }
    fetchOption = (option_id)=>{
        const {Questions} = this.props;
        let targetOption = {};
        let targetQuestion = {};
        Questions.forEach((question,i )=> {
            const option_index = question.options.findIndex(i=>i.id===parseInt(option_id));
            if(option_index > -1){
                targetQuestion = Questions[i];
                targetOption = Questions[i].options[option_index];
            }
        });
        return ({targetQuestion , targetOption});
    }
    addToAnswerSheet = (question , option , event)=>{
        const answersheet = this.state.Answersheet;
        const question_index = answersheet.findIndex(i=>i.question===question.id);
        console.log(question_index);
        if(question_index > -1){
            if(question.isMultipleCorrect){
                answersheet[question_index].options.push(option.id);
                this.setState({Answersheet:answersheet});
            }else{
                event.target.checked = false;
                
                toast.error(`The question ${question.question_text} has only one answer, first ticked option will be taken as default`,{autoClose:7000,position:'bottom-center'});
            }
        }else{
            answersheet.push({question : question.id , options : [option.id,]});
            
            this.setState({
                Answersheet : answersheet,
            })
        }
    }
    removeFromAnswerSheet = (question , option)=>{
        const answersheet = this.state.Answersheet;
        const question_index = answersheet.findIndex(i=>i.question===question.id);
    
        if(question_index > -1){
            // question is in answer sheet
            if(question.isMultipleCorrect){
                const option_index = answersheet[question_index].options.findIndex(j=>j === option.id);
                if(option_index > -1){
                    if(answersheet[question_index].options.length > 1){
                        answersheet[question_index].options.splice(option_index , 1);
                    }else{
                        answersheet.splice(question_index , 1)
                    }
                    
                    this.setState({Answersheet:answersheet})
                }


               
            }else{
               answersheet.splice(question_index , 1);
               
               this.setState({Answersheet:answersheet,multiCorrectError:false});
            }

        }else{
            // question is not in answer sheet
            toast.error(`Fatal Error !`)
            // throw TypeError('Breach detected ! Stop the server at once');
            

        }
    }
    tickUntickOption = (event)=>{
        const {targetQuestion , targetOption} = this.fetchOption(event.target.id);
        if(event.target.checked){
            // when an option is checked
            this.addToAnswerSheet(targetQuestion , targetOption , event);
            toast.info(`Question : ${targetQuestion.question_text}   Answer : ${targetOption.option_text} is selected`);
        }else{
            // when an option is unchecked
            this.removeFromAnswerSheet(targetQuestion , targetOption);
            toast.warning(`Question : ${targetQuestion.question_text}  Answer : ${targetOption.option_text} is removed`);
        }
        
    }
    submitAnswers = ()=>{
        const {exitFullScreen,prodAjaxUrl,Quiz,Student,} = this.props;
        const {Confirmed} = this.state;
        axios.post(`${prodAjaxUrl}/quiz/${Quiz.id}/generate-report/${Student}/`,Confirmed)
            .then((response)=>{
                console.log(response.data)
                this.props.setReport(response.data)
            })
            .catch((response,err)=>{
                console.log(err);
                toast.error(response.message,{position:'bottom-center'})
            })
        exitFullScreen()
    }
    questionStatus = (question_id)=>{
        const {Answersheet} = this.state;
        const question_index = Answersheet.findIndex(i=>i.question === question_id);
        if(question_index > -1){
            return(
                <Badge variant='info'><i className="fa fa-check-square" aria-hidden="true"></i></Badge>
            )
        }else{
            return(
                <Badge variant='danger'><i className="fa fa-circle-o" aria-hidden="true"></i></Badge>
            )
            
        }
    }
    isAnswered = (question_id)=>{
        const {Answersheet} = this.state;
        const q_index = Answersheet.findIndex(i=>i.question === question_id)
        if(q_index > -1) return true;
        return false;
    }
    isConfirmed = (question_id)=>{
        const {Confirmed} = this.state;
        const q_index = Confirmed.findIndex(i=>i.question === question_id)
        if(q_index > -1) return true;
        return false;
    }
    confirmAnswer = (e)=>{
        const {Answersheet} = this.state;
        const confirmedQuestions = this.state.Confirmed;
        const q_index = Answersheet.findIndex(i=>i.question === parseInt(e.target.id));
        if(q_index > -1){

            confirmedQuestions.push(Answersheet[q_index]);
            this.setState({Confirmed:confirmedQuestions});
        }else{

            console.log("Error")
        }
    }
    revokeAnswer = (e)=>{
        const temp_confirmed = this.state.Confirmed;
        const q_index = temp_confirmed.findIndex(i=>i.question === parseInt(e.target.id))
        if(q_index > -1 ){
            temp_confirmed.splice(q_index , 1);
            this.setState({Confirmed:temp_confirmed})
        }else{
            throw TypeError("Breach Detected !");
        }
    }
    render = ()=>{
        const {Quiz,Questions,agencyName} = this.props;
        const {Answersheet,Confirmed} = this.state;
        return(
            <div className='examspace' style={{color:'#fff'}}>
                <div className='status-bar'>
                    <div className='brand'>
                        <h5 style={{margin:0}}>{agencyName}</h5>
                        <br/>
                        <br/>
                        <Button onClick={this.submitAnswers} variant='success' disabled={Answersheet.length === 0} style={{display:'block',margin:'auto'}}>Submit Answers</Button>
                    </div>
                    <div className='quiz-info'>
                        <h4><i className="fa fa-book" aria-hidden="true"></i> {Quiz.name} <span className='badge badge-success'>{Quiz.full_marks} Mark{Quiz.full_marks > 1 && 's'}</span></h4>
                        <h6><i className="fa fa-database" aria-hidden="true"></i> {Quiz.no_of_questions} Question{Quiz.no_of_questions > 1 && 's'}</h6>
                        {Quiz.negative_marking && <h6><i className="fa fa-minus-circle" aria-hidden="true"></i> Marking</h6>}
                    </div>
                    
                    <div className='exam-status'>
                        <Table striped bordered hover style={{marginTop:'0.4em',textAlign:'center',color:'#fff'}}>
                            <thead>
                                <tr>
                                    <th><i className="fa fa-thumbs-up" aria-hidden="true"></i> Confirmed</th>
                                    <th><i className="fa fa-check" aria-hidden="true"></i> Attempt</th>
                                    <th><i className="fa fa-window-minimize" aria-hidden="true"></i> Left</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{Confirmed.length}</td>
                                    <td>{Answersheet.length}</td>
                                    <td>{Quiz.no_of_questions - Answersheet.length}</td>
                                
                                </tr>
                                
                            </tbody>
                        </Table>

                    </div>
                    <div className='timer'>
                        <ReactCountdownClock seconds={Quiz.allotted_time_in_minutes * 60}
                            color="#2F251B"
                            alpha={0.9}
                            size={129}
                            onComplete={this.submitAnswers} 
                            style={{height:'100%'}}/>

                    </div>


                </div>
               <Tab.Container id="left-tabs-example" defaultActiveKey={Questions[0].id}>
                    <Row>
                        <Col sm={3} >
                        <Nav variant='pills' style={{height:'75vh',overflow:'auto'}}>
                            {Questions.map((question , i)=>{
                                return(
                                    <Nav.Item key={i}>
                                        <Nav.Link eventKey={question.id}>{this.isConfirmed(question.id)?<Badge variant='success'><i className="fa fa-thumbs-up" aria-hidden="true"></i></Badge>:<Badge variant='warning'><i className="fa fa-question-circle" aria-hidden="true"></i></Badge>} {this.questionStatus(question.id)} <span className='badge badge-primary'>{i+1}</span>  {question.question_text}</Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                            
                            
                        </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                    {Questions.map((question , i)=>{
                                        return(
                                            <Tab.Pane eventKey={question.id} key={i}>
                                                <h2  style={{color:'#F0A868'}}>{question.question_text}</h2>
                                                <br/>
                                                
                                                {question.isMultipleCorrect && <Alert variant='warning' style={{width:'60%'}}>This Question has multiple Answers</Alert>}
                                                <div>
                                                    {question.options.map((option , j)=>{
                                                        return(
                                                            <InputGroup className="mb-3" key={j} style={{width:'60%'}}>
                                                                <InputGroup.Prepend>
                                                                <InputGroup.Checkbox onChange={this.tickUntickOption} id={option.id}/>
                                                                </InputGroup.Prepend>
                                                                <FormControl value={option.option_text} disabled/>
                                                            </InputGroup>
                                                        );
                                                    })}
                                                </div>
                                                {this.isAnswered(question.id) && <Button variant='success' onClick={this.confirmAnswer} id={question.id} disabled={this.isConfirmed(question.id)}><i className="fa fa-thumbs-up" aria-hidden="true"></i> Confirm ?</Button>}
                                                {this.isConfirmed(question.id) && <Button variant='warning' id={question.id} onClick={this.revokeAnswer}><i className="fa fa-question-circle" aria-hidden="true"></i> Revoke</Button>} 
                                            </Tab.Pane>
                                        );
                                    })}
                
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            </div>

        );
    }
}

export default Examspace;