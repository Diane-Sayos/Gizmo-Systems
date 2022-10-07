import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
    students: [],
    campuses: []
}

const studentsReducer = (state  = [], action) => {
    if(action.type === 'SET_STUDENTS'){
        return action.students;
    }
    else if(action.type === 'CREATE_STUDENT'){
        return [...state, action.student];
    }
    else if(action.type === 'DELETE_STUDENT'){
        return state.filter(student => student.id !== action.student.id);
    }
    else if(action.type === 'UPDATE_STUDENT'){
        return state.map(student => student.id === action.student.id ? action.student : student);
    }
    return state;
}

const campusesReducer = (state = [], action) => {
    if(action.type === 'SET_CAMPUSES'){
        return action.campuses;
    }
    else if(action.type === 'CREATE_CAMPUS'){
        return [...state, action.campus];
    }
    else if(action.type === 'DELETE_CAMPUS'){
        return state.filter(campus => campus.id !== action.id);
    }
    else if(action.type === 'UPDATE_CAMPUS'){
        return state.map(campus => campus.id === action.campus.id ? action.campus : campus)
    }
    return state;
}
//get all students from backend
export const fetchStudents = () => {
    return async(dispatch) => {
        const students = (await axios.get('/api/students')).data;
        dispatch({type: 'SET_STUDENTS', students});
    }
};
//create new student
export const createStudent = (student, history) => {
    return async(dispatch) => {
        student = (await (axios.post('/api/students', student))).data;
        dispatch({type: 'CREATE_STUDENT', student});
        // history.push(`/students/${student.id}`);
    }
};
//delete specific student
export const deleteStudent = (student) => {
    return async(dispatch) => {
        await axios.delete(`/api/students/${student.id}`);
        dispatch({type: 'DELETE_STUDENT', student});
    }
};
//update specific student
export const updateStudent = (student, id) => {
    return async(dispatch) => {
        student = (await axios.put(`/api/students/${id}`, student)).data;
        console.log(student)
        dispatch({type: 'UPDATE_STUDENT', student})
    }
};
//get all campuses from backend
export const fetchCampuses = () => {
    return async(dispatch) => {
        const campuses = (await axios.get('/api/campuses')).data;
        dispatch({type: 'SET_CAMPUSES', campuses});
    }
};
//create new campus
export const createCampus = (campus) => {
    return async(dispatch) => {
        campus = (await axios.post('/api/campuses', campus)).data;
        dispatch({type: 'CREATE_CAMPUS', campus});
        // history.push(`/campuses/${campus.id}`);
    }
};
//delete specific campus
export const deleteCampus = (id) => {
    return async(dispatch) => {
        await axios.delete(`/api/campuses/${id}`);
        dispatch({type: 'DELETE_CAMPUS', id})
    }
};
//update specific campus
export const updateCampus = (campus, id) => {
    return async(dispatch) => {
        console.log(id)
        console.log(campus)
        campus = (await axios.put(`/api/campuses/${id}`, campus)).data;
        console.log(campus)
        dispatch({type: 'UPDATE_CAMPUS', campus})
    }
};

const reducer = combineReducers({
    students: studentsReducer,
    campuses: campusesReducer
});

const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducer, middleware);

export default store;