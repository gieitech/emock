import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Button,Form,Row,Col, Alert,Spinner} from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';

import './CreateQuestion.css';

// importing action
import {createQuestion,setSelectedQuestion} from '../../../redux/Question/Question.actions';



class CreateQuestion extends Component{
    state = {
        expanded : false,
        question_text : '',
        marks : '',
        options : [],
        tinyMceApiKey : '3b8wkepr2a0zbsx1aldnl4gunknusicdjflotvupxedz46to',
        errors : [],
        
    }
    toggleExpand = ()=>{
        const {setSelectedQuestion} = this.props;
        this.setState({expanded:!this.state.expanded});
        setSelectedQuestion(null);
    }
    addOption = ()=>{
        const oldOptions = this.state.options;
        oldOptions.push( {option_text : '' , isCorrect : false});
        this.setState({
            options : oldOptions,
        })
    }
    removeOption = (index)=>{
        
        const oldOptions = this.state.options;
        
    
        oldOptions.splice(index, 1);
        
        this.setState({
            options:oldOptions,
        })
    }

    optionTextChange = (content,editor)=>{
        const option_index = parseInt(editor.id);

        const oldOptions = this.state.options;
        oldOptions[option_index].option_text = content;
        this.setState({
            options : oldOptions,
        })
       
    }

    optionCorrectChange = (e,index)=>{
        
        const oldOptions = this.state.options;
        oldOptions[index].isCorrect = e.target.checked;
        this.setState({
            options:oldOptions,
        })
    }

    questionTextChange = (content,editor)=>{
        this.setState({
            question_text : content,
        })
    }

    marksChange = (e)=>{
        this.setState({
            marks : e.target.value
        })
    }
    clearForm = ()=>{
        this.setState({
            question_text : '',
            marks : '',
            options : [],
            errors:[],
        })
    }

    submit = ()=>{
        const {question_text,options,marks} = this.state;
        const {quizId , createQuestion} = this.props;
        let temp_errors = [];
        let no_correct_answer = true;

        if(options.length === 0) temp_errors.push('A question must have options');
        options.forEach(option=>{
            if(option.isCorrect) no_correct_answer = false;
        });
        if(no_correct_answer) temp_errors.push('One Of the options must be correct !');
        if(!question_text) temp_errors.push('Must enter a question !');

        options.forEach(option=>{
            if(!option.option_text) temp_errors.push('No option content. ');
        })
        if(!marks) temp_errors.push('Must enter the marks of this question')

        if(temp_errors.length > 0){
            this.setState({
                errors : temp_errors,
            })
        }else{
            this.setState({
                errors : [],
            })
            const questionData = {
                question_text,
                marks,
                options,
            }
            createQuestion(quizId,questionData);

        }

    }

    renderOptionEditor = (option ,index)=>{
        const {tinyMceApiKey} = this.state;
        return(
            <Form.Group className='single-option'>
                <Row>
                    <Col md={10}>
                        <Form.Check 
                            type="checkbox" 
                            label="Correct"
                            name="isCorrect" 
                            onChange={()=>{}}
                            checked={option.isCorrect}
                            onClick={(e)=>this.optionCorrectChange(e,index)}
                        />
                    </Col>
                    <Col md={2}>
                        <Button variant='danger' 
                            className='remove-option' 
                            
                            onClick={()=>this.removeOption(index)}
                            
                        >
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
                <Editor 
                    id={`${index}`}
                    name='option_text'
                    apiKey={tinyMceApiKey} 
                    init={{
                        height : 300,
                        menubar: true,
                        plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                        'undo redo | formatselect |  \
                        bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={this.optionTextChange}
                    value = {option.option_text}    
                />
            </Form.Group>
        )
    }

    render = ()=>{
        const {expanded,question_text,options,tinyMceApiKey,marks,errors} = this.state;
        const {creatingQuestion,createdQuestion,questionCreatingError} = this.props;
        return(
            <div>
                {   expanded 
                    && <div className='create-question-form'>
                        <Form>
                            
                            
                            
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Row>
                                        <Col md={8}>
                                            <Form.Label>New Question</Form.Label>
                                            {
                                                errors.length > 0 
                                                && <Alert variant='danger'>
                                                    {errors.map((error,j)=>{
                                                        return(
                                                            <li key={j}>{error}</li>
                                                        )
                                                    })}
                                                </Alert>
                                            }
                                            {
                                                createdQuestion 
                                                &&
                                                <Alert variant="success">Question created Successfully</Alert>
                                            }
                                            {
                                                questionCreatingError
                                                && <Alert variant='danger'>{questionCreatingError.message}</Alert>
                                            }
                                        </Col>
                                        <Col md={4}>
                                            <Row>
                                                <Col sm={7}>
                                                    <input 
                                                        type='number' 
                                                        className='form-control' 
                                                        placeholder="Marks" 
                                                        min={0}   
                                                        value={marks}
                                                        onChange={this.marksChange}
                                                        style={{display:'inline-block'}} 
                                                    />
                                                
                                                </Col>
                                                <Col sm={5}>
                                                     <Button variant="danger" onClick={this.clearForm}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                                                </Col>
                                            </Row>
                                            
                                            
                                        </Col>
                                    </Row>
                                    <Editor 
                                        
                                        apiKey={tinyMceApiKey} 
                                        init={{
                                            height : 350,
                                            menubar: true,
                                            plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar:
                                            'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help'
                                        }} 
                                        value={question_text}
                                        onEditorChange={this.questionTextChange}   
                                    />
                                </Form.Group>
                                <Form.Group>   
                                    <Form.Label>Options</Form.Label>
                                    <Row>
                                        {options.map((option,i)=>{
                                            return(
                                                <Col md={6} key={i}>
                                                    {this.renderOptionEditor(option,i)}
                                                </Col>
                                            )   
                                        })}
                                        
                                            
                                        
                                        <Col md={6} style={{height:350}}>
                                            <Button variant="success" className='add-option' onClick={this.addOption}>Add Option</Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Form>

                    </div>
                    
                }
                <Button variant="success" className='create-question-toggle' onClick={this.toggleExpand}><i className="fa fa-plus" aria-hidden="true"></i></Button>
                {
                    expanded 
                    && 
                    <Button 
                        variant="primary" 
                        className='save-question' 
                        onClick={this.toggleExpand} 
                        disabled={options.length < 4 || creatingQuestion} 
                        onClick={this.submit}
                    >{creatingQuestion ?<Spinner animation="grow" size="lg" />  : <i className="fa fa-save" aria-hidden="true"></i>}</Button>
                    
                }
            </div>
        );
    }
}

const mapStateToProps = ({question : {creatingQuestion,createdQuestion,questionCreatingError}})=>({
    creatingQuestion,
    createdQuestion,
    questionCreatingError,
})

const mapDispatchToProps = dispatch =>({
    createQuestion : (quiz_id,questionData)=>dispatch(createQuestion(quiz_id,questionData)),
    setSelectedQuestion : (question)=>dispatch(setSelectedQuestion(question)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateQuestion);