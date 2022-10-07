import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent } from '../store';

const StudentsView = ({ campuses, deleteStudent, pageArr, columnView }) => {
    const [pageNum, setPageNum] = useState(0);
    const students = columnView[pageNum];
    return (
        <div className='main'>
            <table className='table'>
                <tbody>
                    <tr>
                        <th>STUDENTS</th>
                        <th>CAMPUS</th>
                        <th>EMAIL</th>
                        <th> </th>
                    </tr>
                    {
                        students.map(student => {
                            const _campus = campuses.find(campus => campus.id === student.campusId) || {name: 'NOT ENROLLED'};
                            return (
                                <tr key={student.id}>
                                    <td><Link to={`/students/${ student.id }`}>{ `${student.lastName}, ${student.firstName}` }</Link></td>
                                    <td><Link to={`/campuses/${ _campus.id }`}>{ _campus.name }</Link></td>
                                    <td>{ student.email }</td>
                                    <td><button className='remove' onClick={ () => deleteStudent(student) }>x</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <ul className='pager'>
                {
                    pageArr.map(page => {
                        return (
                            <li key={ page }><button onClick={ () => setPageNum((page - 1))}  className={(pageNum+1) === page ? 'selected' : ''}>{page}</button></li>
                        )
                    })
                }
            </ul>
        </div>
    )
};
const mapState = state => {
    const num = 10;
    const pageCount = Math.ceil(state.students.length / num);
    const pageArr = [];
    const columnView = [];
    let columnSlice = [];
    for(let i = 0; i < pageCount; i++){
        pageArr.push(i + 1);
    }
    for(let i = 0; i < state.students.length; i ++){
        columnSlice.push(state.students[i]);
        if(columnSlice.length === num){
            columnView.push(columnSlice);
            columnSlice = [];
        }
    }
    columnView.push(columnSlice);
    columnSlice = [];
    return {
        students: state.students,
        campuses: state.campuses,
        pageArr,
        columnView
    }
};

const mapDispatch = dispatch => {
    return {
        deleteStudent: (student) => {
            dispatch(deleteStudent(student))
        }
    }
};
export default connect(mapState, mapDispatch)(StudentsView);