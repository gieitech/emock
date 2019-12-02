import questionTypes from './Question.types';
import backendAPI from '../../apis/backend';



export const createQuestionStart = ()=>{
    return {
        type : questionTypes.CREATE_QUESTION_START,
    }
}

export const createQuestionSuccess = (newQuestion)=>{
    return {
        type : questionTypes.CREATE_QUESTION_SUCCESS,
        payload : newQuestion,
    }
}

export const createQuestionError = (error)=>{
    return {
        type : questionTypes.CREATE_QUESTION_ERROR,
        payload : error,
    }
}

export const createQuestion = (quiz_id , questionData)=>{
    return dispatch => {
        dispatch(createQuestionStart());
        backendAPI.post(`/quiz/${quiz_id}/question/create/`, questionData)
            .then(response=>{
                dispatch(createQuestionSuccess(response.data));
                  
            })
            .catch(error=>dispatch(createQuestionError(error)));
    }
}


export const fetchQuestionsStart = ()=>{
    return {
        type : questionTypes.FETCH_ALL_QUESTIONS_START,
    }
}

export const fetchQuestionsSuccess = (allQuestions)=>{
    return {
        type : questionTypes.FETCH_ALL_QUESTIONS_SUCCESS,
        payload : allQuestions,
    }
}

export const fetchQuestionsError = (error)=>{
    return {
        type : questionTypes.FETCH_ALL_QUESTIONS_ERROR,
        payload : error,
    }
}

export const fetchAllQuestions = (quiz_id)=>{
    return dispatch=>{
        dispatch(fetchQuestionsStart());
        backendAPI.get(`/quiz/${quiz_id}/questions/`)
            .then(response=>dispatch(fetchQuestionsSuccess(response.data)))
            .catch(error=>dispatch(fetchQuestionsError(error)));
    }
}


export const setSelectedQuestion = (question)=>{
    return {
        type : questionTypes.SET_SELECTED_QUESTION,
        payload : question,
    }
}

export const addNewOption = (newOption)=>{
    return {
        type : questionTypes.ADD_OPTION,
        payload : newOption,
    }
}

export const removeOption = (option_index)=>{
    return {
        type : questionTypes.REMOVE_OPTION,
        payload : option_index,
    }
}

export const changeQuestionText = (newText)=>{
    return {
        type : questionTypes.QUESTION_TEXT_CHANGE,
        payload : newText
    }
}

export const questionMarksChange = (newMarks)=>{
    return {
        type : questionTypes.QUESTION_MARKS_CHANGE,
        payload : newMarks,
    }
}

export const optionContentChange = (newContent , index)=>{
    return {
        type : questionTypes.OPTION_CONTENT_CHANGE,
        payload : {newContent,index},
    }
}

export const optionCorrectChange = (newCorrect,index)=>{
    return {
        type : questionTypes.OPTION_CORRECT_CHANGE,
        payload : {newCorrect,index1 : index},
    }
}