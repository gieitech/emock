import quizTypes from './Quiz.types';
import backendAPI from '../../apis/backend';

export const fetchQuizesStart = ()=>{
    return {
        type : quizTypes.FETCH_QUIZES_START,
    }
}

export const fetchQuizesSuccess = (quizlist)=>{
    return {
        type : quizTypes.FETCH_QUIZES_SUCCESS,
        payload : quizlist,
    }
}
export const fetchQuizesError = (error)=>{
    return {
        type : quizTypes.FETCH_QUIZES_ERROR,
        payload : error,
    }
}

export const fetchQuizes = ()=> {
    return dispatch => {
        dispatch(fetchQuizesStart());
        backendAPI.get('/quiz/list/')
            .then(response=>dispatch(fetchQuizesSuccess(response.data)))
            .catch(error=>dispatch(fetchQuizesError(error)));
    }
}

export const fetchSingleQuizStart = ()=>{
    return {
        type : quizTypes.FETCH_SINGLEQUIZ_START,
    }
}

export const fetchSingleQuizSuccess = (singleQuiz)=>{
    return {
        type : quizTypes.FETCH_SINGLEQUIZ_SUCCESS,
        payload : singleQuiz,
    }
}

export const fetchSingleQuizError = (error)=>{
    return {
        type : quizTypes.FETCH_SINGLEQUIZ_ERROR,
        payload : error,
    }
}

export const fetchSingleQuiz = (quiz_id)=>{
    return dispatch =>{
        dispatch(fetchSingleQuizStart());
        backendAPI.get(`/quiz/${quiz_id}/`)
            .then(response=>dispatch(fetchSingleQuizSuccess(response.data)))
            .catch(error=>dispatch(fetchSingleQuizError(error)))
    }
}

export const createQuizStart = ()=>{
    return {
        type : quizTypes.CREATE_QUIZ_START,
    }
}

export const createQuizSuccess = (newQuiz)=>{
    return {
        type : quizTypes.CREATE_QUIZ_SUCCESS,
        payload : newQuiz,
    }
}

export const createQuizError = (error)=>{
    return {
        type : quizTypes.CREATE_QUIZ_ERROR,
        payload : error
    }
}

export const createQuiz = (quizData)=>{
    return dispatch => {
        dispatch(createQuizStart());
        backendAPI.post('/quiz/create/', quizData)
            .then(response=>dispatch(createQuizSuccess(response.data)))
            .catch(error => dispatch(createQuizError(error)));
    }
}

