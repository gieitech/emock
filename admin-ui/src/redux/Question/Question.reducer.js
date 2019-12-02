import questionTypes from './Question.types';



const  INITIAL_STATE = {
    creatingQuestion : false,
    questionCreatingError : null,
    createdQuestion : null,

    allQuestions : null,
    fetchQuestionsError : null,
    fetchingQuestions : false,

    selectedQuestion : null,
    options:null,
}


const questionReducer = (state = INITIAL_STATE , action)=>{

    

    switch(action.type){
        case questionTypes.CREATE_QUESTION_START:
            return {
                ...state,
                creatingQuestion : true,
            }

        case questionTypes.CREATE_QUESTION_SUCCESS:
            const oldAllQuestions = state.allQuestions;
            const newAllQuestions = [...oldAllQuestions, action.payload]
            return {
                ...state,
                creatingQuestion : false,
                createdQuestion : action.payload,
                questionCreatingError : null,
                allQuestions:newAllQuestions,
            }

        case questionTypes.CREATE_QUESTION_ERROR:
            return {
                ...state,
                creatingQuestion:false,
                createdQuestion : null,
                questionCreatingError : action.payload
            }

            case questionTypes.FETCH_ALL_QUESTIONS_START:
                return {
                    ...state,
                    fetchingQuestions : true,
                }

            case questionTypes.FETCH_ALL_QUESTIONS_SUCCESS:
                return {
                    ...state,
                    fetchingQuestions : false,
                    allQuestions : action.payload,
                    fetchQuestionsError  : null,

                }

            case questionTypes.FETCH_ALL_QUESTIONS_ERROR:
                return {
                    ...state,
                    fetchingQuestions : false,
                    allQuestions : null,
                    fetchQuestionsError : action.payload
                }

            case questionTypes.SET_SELECTED_QUESTION:
                return {
                    ...state,
                    selectedQuestion : action.payload,
                    options : action.payload.options,
                }
            case questionTypes.ADD_OPTION:
                const oldOpts = state.options;
                
                const newOptions = [...oldOpts,action.payload];
                
                return {
                    ...state,
                    options : newOptions,
                }

            case questionTypes.REMOVE_OPTION:
                const option_index = parseInt(action.payload);
                
                const oldOpts1 = state.options;
                oldOpts1.splice(option_index , 1);
                
                return {
                    ...state,
                    options : oldOpts1,
                }

            case questionTypes.QUESTION_TEXT_CHANGE:
                const selectedQuestion1 = state.selectedQuestion;
                selectedQuestion1.question_text = action.payload;
                return {
                    ...state,
                    selectedQuestion : selectedQuestion1,
                }

            case questionTypes.QUESTION_MARKS_CHANGE:
                    const selectedQuestion2 = state.selectedQuestion;
                    selectedQuestion2.marks = action.payload;
                return {
                    ...state,
                    selectedQuestion : selectedQuestion2,
                }

            case questionTypes.OPTION_CONTENT_CHANGE:
                const {newContent,index} = action.payload;
               
                const options1 = state.options;
                options1[index].option_text = newContent;
                
                return {
                    ...state,
                    options : options1,
                }

            case questionTypes.OPTION_CORRECT_CHANGE:
                const {newCorrect,index1} = action.payload;
                
                const options2 = state.options;
                options2[index1].isCorrect = newCorrect;
                
                return {
                    ...state,
                    options : options2,
                }


        default:
            return state;
    }
}

export default questionReducer;