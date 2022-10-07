import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus, updateStudent } from '../store';

const CampusesView = ({ pageArr, columnView, deleteCampus, students, updateStudent }) => {
    const [pageNum, setPageNum] = useState(0);
    const campuses= columnView[pageNum];
    const handleDelete = async(campusId) => {
        const findStudents = students.filter(student => student.campusId === campusId);
        await findStudents.map(student => {
            student.campusId = 0;
             updateStudent(student, student.id)
        });
        await deleteCampus(campusId);
    };
    return (
        <div className='main'>
            <table className='table'>
                <tbody>
                    <tr>
                        <th>CAMPUSES</th>
                        <th>ADDRESSES</th>
                        <th> </th>
                    </tr>
                    {
                        campuses.map(campus => {
                            return (
                                <tr key={ campus.id }>
                                    <td><Link to={`/campuses/${ campus.id }`}>{ campus.name }</Link></td>
                                    <td>{ campus.address }</td>
                                    <td><button className='remove' onClick={ () => handleDelete(campus.id) }>x</button></td>
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
                            <li key={ page }><button onClick={ () => setPageNum((page - 1))} className={(pageNum+1) === page ? 'selected' : ''}>{page}</button></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapState = state => {
    const num = 10;
    const pageCount = Math.ceil(state.campuses.length / num);
    const pageArr = [];
    const columnView = [];
    let columnSlice = [];
    for(let i = 0; i < pageCount; i++){
        pageArr.push(i + 1);
    }
    for(let i = 0; i < state.campuses.length; i++){
        columnSlice.push(state.campuses[i]);
        if(columnSlice.length === num){
            columnView.push(columnSlice);
            columnSlice = [];
        }
    }
    columnView.push(columnSlice);
    columnSlice = [];
    return {
        campuses: state.campuses,
        pageArr,
        columnView,
        students: state.students
    }
}

const mapDispatch = dispatch => {
    return {
        deleteCampus: (id) => {
            dispatch(deleteCampus(id))
        },
        updateStudent: (student, id) => {
            dispatch(updateStudent(student, id))
        }
    }
};

export default connect(mapState, mapDispatch)(CampusesView);