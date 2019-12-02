import quizTypes from './Quiz.types';

const INITIAL_STATE = {
    Quizes : null,
    fetching : false,
    error : null,
    singleQuizError : false,
    singleQuiz : null,
    Questions : null,
    creating : false,
    createError : null,
}

const quizReducer = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case quizTypes.FETCH_QUIZES_START:
            return {
                ...state,
                fetching : true,
            }
        
        case quizTypes.FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                fetching : false,
                Quizes : action.payload,
            }

        case quizTypes.FETCH_QUIZES_ERROR:
            return {
                ...state,
                fetching : false,
                error : action.payload,
            }

        case quizTypes.FETCH_SINGLEQUIZ_START:
            return {
                ...state,
                fetching : true,
            }

        case quizTypes.FETCH_SINGLEQUIZ_SUCCESS:
            return {
                ...state,
                singleQuiz : action.payload,
                fetching : false,
            }

        case quizTypes.FETCH_SINGLEQUIZ_ERROR:
            return {
                ...state,
                fetching : false,
                singleQuizError : action.payload,
            }
        
        case quizTypes.CREATE_QUIZ_START:
            return {
                ...state,
                creating : true,
            }

        case quizTypes.CREATE_QUIZ_SUCCESS:
            const newQuizes = [...state.Quizes , action.payload];    

            return {
                ...state,
                Quizes : newQuizes,
                creating : false,
                error : null,
            }

        case quizTypes.CREATE_QUIZ_ERROR:

            return {
                ...state,
                creating : false,
                createError : action.payload
            } 

        
        
        default:
            return state;
    }
}

export default quizReducer;