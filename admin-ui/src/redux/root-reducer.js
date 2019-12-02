import {combineReducers} from 'redux';
import userReducer from './User/User.reducer';
import quizReducer from './Quiz/Quiz.reducer';
import questionReducer from './Question/Question.reducer';

export default combineReducers({
   user : userReducer, 
   quiz : quizReducer,
   question : questionReducer,
})