import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Container,Row,Col,Button,Form,Badge} from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import {
            setSelectedQuestion,
            addNewOption,
            removeOption,
            changeQuestionText,
            questionMarksChange,
            optionContentChange,
            optionCorrectChange,

        } from '../../../redux/Question/Question.actions';

import './UpdateQuestion.css';

class UpdateQuestion extends Component {
    state = {
        tinymceApiKey : ''
    }

    renderOption = (option,index)=>{
        const {tinymceApiKey} = this.state;
        const {
            removeOption,
            optionContentChange,
            optionCorrectChange,

        } = this.props;
        console.log('i am re rendring')
        return(
            <Form.Group className='single-option' key={index}>
                <Row>
                    <Col md={10}>
                        <Form.Check 
                            type="checkbox" 
                            label="Correct"
                            name="isCorrect" 
                            onChange={()=>{}}
                            checked={option.isCorrect}
                            onClick={(e)=>optionCorrectChange(e.target.checked,index)}
                        />
                    </Col>
                    <Col md={2}>
                        <Button variant='danger' 
                            className='remove-option' 
                            
                            onClick={()=>removeOption(index)}
                            
                        >
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
                <Editor 
                    id={`${index}`}
                    name='option_text'
                    apiKey={tinymceApiKey} 
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
                    // onEditorChange={this.optionTextChange}
                    value = {option.option_text} 
                    onEditorChange={(content)=>optionContentChange(content,index)}   
                />
            </Form.Group>
        )
    }

    _markschange = (e)=>{
        const newMarks = parseInt(e.target.value);
        console.log(newMarks);
        const {questionMarksChange,selectedQuestion} = this.props;
        console.log(selectedQuestion.marks);
        questionMarksChange(newMarks);
    }

    render = ()=>{
        const {tinymceApiKey} = this.state;
        const {
                selectedQuestion,
                setSelectedQuestion,
                addNewOption,
                changeQuestionText,
                options,
            } = this.props;
            
        return(
            selectedQuestion 
                ? <Container className='update-question'>
                    <Row>
                        <Col md={8}>
                            <h3>Update Question</h3>
                        </Col>
                        <Col md={4}>
                            <Row>
                                <Col sm={8}>
                                    <input 
                                        min={0}
                                        type="number"
                                        className="form-control"
                                        placeholder = "Marks"
                                        value={selectedQuestion.marks}
                                        onChange={this._markschange}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Button variant="danger" onClick={()=>setSelectedQuestion(null)}><i className="fa fa-times" aria-hidden="true"></i></Button>
                                </Col>
                            </Row>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                        <Editor 
                                        
                            apiKey={tinymceApiKey} 
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
                            value={selectedQuestion.question_text}   
                            onEditorChange={changeQuestionText}
                        />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md={10}>
                            <h3>Options <Badge variant="info">{options.length}</Badge></h3>
                        </Col>
                        <Col md={2}>
                            <Button variant="success" onClick={()=>addNewOption({
                                    question:selectedQuestion.id,
                                    option_text : '',
                                    isCorrect : false,
                                })}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </Button>
                        </Col>
                        
                    </Row>
                    <hr/>
                    <Row>
                        {options.map((option,i)=>{
                                return(
                                    <Col md={6} key={i}>
                                        {this.renderOption(option,i)}
                                    </Col>
                                    
                                );
                            })}
                    </Row>
                  </Container>
                : <div style={{display:'none'}}></div>
        );
    }
}

const mapStateToProps = ({question : {selectedQuestion,options},})=>({
    selectedQuestion,
    options,
})

const mapDispatchToProps = dispatch=>({
    setSelectedQuestion : (question)=>dispatch(setSelectedQuestion(question)),
    addNewOption : (option)=>dispatch(addNewOption(option)),
    removeOption : (option_index)=>dispatch(removeOption(option_index)),
    changeQuestionText : (newText)=>dispatch(changeQuestionText(newText)),
    questionMarksChange : (newMarks)=>dispatch(questionMarksChange(newMarks)),
    optionContentChange : (newContent,index)=>dispatch(optionContentChange(newContent,index)),
    optionCorrectChange : (newCorrect,index)=>dispatch(optionCorrectChange(newCorrect,index)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateQuestion);