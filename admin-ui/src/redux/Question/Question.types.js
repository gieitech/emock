const questionTypes = {
    CREATE_QUESTION_START : 'CREATE_QUESTION_START',
    CREATE_QUESTION_SUCCESS : 'CREATE_QUESTION_SUCCESS',
    CREATE_QUESTION_ERROR : 'CREATE_QUESTION_ERROR',

    FETCH_ALL_QUESTIONS_START : 'FETCH_ALL_QUESTIONS_START',
    FETCH_ALL_QUESTIONS_SUCCESS : 'FETCH_ALL_QUESTIONS_SUCCESS',
    FETCH_ALL_QUESTIONS_ERROR : 'FETCH_ALL_QUESTIONS_ERROR',

    SET_SELECTED_QUESTION : 'SET_SELECTED_QUESTION',
    ADD_OPTION : 'ADD_OPTION',
    REMOVE_OPTION : 'REMOVE_OPTION',

    OPTION_CONTENT_CHANGE : 'OPTION_CONTENT_CHANGE',
    OPTION_CORRECT_CHANGE : 'OPTION_CORRECT_CHANGE',

    QUESTION_TEXT_CHANGE : 'QUESTION_TEXT_CHANGE',
    QUESTION_MARKS_CHANGE : 'QUESTION_MARKS_CHANGE',


}

export default questionTypes;