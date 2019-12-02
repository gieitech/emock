import React,{Component} from 'react';
import {Button,Form,Alert,Spinner} from 'react-bootstrap';
import {connect} from 'react-redux';

import {createQuiz} from '../../../redux/Quiz/Quiz.actions';

import './CreateQuiz.css';

class CreateQuiz extends Component{
    state = {
        expanded : false,
        name : '',
        syllabus:'',
        cover_image_url:'',
        allotted_time_in_minutes : 0,
        isActive : false,
        negative_marking : false,
        errors : [],
    }

    

    toggleExpanded = ()=>{
        this.setState({
            expanded : !this.state.expanded,
        })
    }

    inputChange = (e)=>{
        
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    checkBoxChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.checked,
        })
    }
    clearForm = ()=>{
        this.setState({
            name : '',
            syllabus:'',
            cover_image_url:'',
            allotted_time_in_minutes : 0,
            isActive : false,
            negative_marking : false,
            errors : [],
        })
    }

    submit = ()=>{
        const {
            
            name,
            syllabus,
            cover_image_url,
            allotted_time_in_minutes,
            isActive,
            negative_marking,

        } = this.state;

        const {createQuiz} = this.props;

        let temp_errors = [];
        if(!name) temp_errors.push('Must Enter a Name');
        if(!syllabus) temp_errors.push('Must Enter a Syllabus');
        if(!cover_image_url) temp_errors.push('Must Enter a Cover Image');
        if(!allotted_time_in_minutes) temp_errors.push('Must enter a Time Limit');
        
        if(temp_errors.length > 0){
            this.setState({errors:temp_errors});
        }else{
            this.setState({errors:[]});
            const data = {
                name,
                syllabus,
                cover_image_url,
                allotted_time_in_minutes,
                isActive,
                negative_marking,
            }
            createQuiz(data);
        }

    }
    render=()=>{
        const {
            expanded,
            name,
            syllabus,
            cover_image_url,
            allotted_time_in_minutes,
            isActive,
            negative_marking,
            errors,

        } = this.state;

         const {creating,createError} = this.props;
        return(
            <div>
                {expanded && <div className='create-form-body container'>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Quiz Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Quiz Name" 
                                name='name' 
                                value={name}
                                onChange={this.inputChange}    
                            />
                            
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Syllabus</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                row={3} 
                                placeholder="Syllabus" 
                                name='syllabus' 
                                value={syllabus}
                                onChange={this.inputChange}    
                            />
                            
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Allotted Time (Minutes)</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Allotted time" 
                                name='allotted_time_in_minutes' 
                                min={0} 
                                value={allotted_time_in_minutes}
                                onChange={this.inputChange}
                                />
                            
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <img src={cover_image_url} style={{width:'100%'}} />
                            <Form.Label>Cover Image Url</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Cover Image Url" 
                                name='cover_image_url' 
                                checked={cover_image_url}
                                onChange={this.inputChange}    
                            />
                            
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check 
                                type="checkbox" 
                                label="Activate the quiz" 
                                checked={isActive}
                                name="isActive"

                                onClick={this.checkBoxChange}
                                
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check 
                                type="checkbox" 
                                label="Negative Marking Applicable"
                                name="negative_marking" 
                                checked={negative_marking}
                                onClick={this.checkBoxChange}    
                            />
                        </Form.Group>
                        {
                            errors.length > 0 && <Alert variant='danger'>
                                {errors.map((error,i)=>{
                                    return(
                                        <li key={i}>{error}</li>
                                    );
                                })}
                            </Alert>
                        }
                        {
                            createError && <Alert variant='danger'>{createError.message}</Alert>
                        }
                        <Button variant="dark" type="button" onClick={this.submit} disabled={creating}>
                            {creating ? <Spinner animation="grow" size="lg" /> : 'Create Quiz'}
                        </Button>
                        <Button variant="warning" type="button" onClick={this.clearForm}>
                            Clear
                        </Button>
                        
                    </Form>
                    <br />
                </div>}
                
                <Button variant='success' className='toggle-quiz-create' onClick={this.toggleExpanded}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </Button>
            </div>
        );
    }
}

const mapStateToProps = ({quiz : {creating,createError}})=>({
    creating,
    createError,
})

const mapDispatchToProps = dispatch => ({
    createQuiz : (quizData)=>dispatch(createQuiz(quizData))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps,

)(CreateQuiz);