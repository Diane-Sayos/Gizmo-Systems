import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent, updateStudent } from '../store';

class StudentForm extends Component {
    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            imageUrl: '',
            gpa: 0.00,
            campusId: 0
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    componentDidMount(){
        this.setState({
            firstName: this.props.student.firstName,
            lastName: this.props.student.lastName,
            email: this.props.student.email,
            imageUrl: this.props.student.imageUrl,
            gpa: this.props.student.gpa,
            campusId: this.props.student.campusId
        })
    };
    componentDidUpdate(prevProps){
        if(!prevProps.student.id && this.props.student.id){
            this.setState({
                firstName: this.props.student.firstName,
                lastName: this.props.student.lastName,
                email: this.props.student.email,
                imageUrl: this.props.student.imageUrl,
                gpa: this.props.student.gpa,
                campusId: this.props.student.campusId
            })
        }
        if(prevProps.student.id && !this.props.student.id){
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                imageUrl: '',
                gpa: 0.00,
                campusId: 0
            })
        }
    };
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    };
    handleSubmit(e){
        e.preventDefault();
        if(this.props.student.id){
            this.props.updateStudent({...this.state}, this.props.student.id);
        } else {
            this.props.createStudent({...this.state});
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                imageUrl: '',
                gpa: 0.00,
                campusId: 0
            });
        }
    };
    render(){
        const { firstName, lastName, email, imageUrl, gpa, campusId } = this.state;
        const { campuses, student } = this.props;
        const { onChange, handleSubmit } = this;
        return (
            <div className='side'>
                <h3>{ student.id ? 'UPDATE STUDENT FORM' : 'STUDENT FORM'}</h3>
                <form onSubmit={ handleSubmit }>
                    <label>First Name:
                        <input
                            type="text"
                            name="firstName"
                            required
                            value={ firstName }
                            onChange={ onChange }
                        />
                    </label>
                    <label>Last Name:
                        <input
                            type="text"
                            name="lastName"
                            required
                            value={ lastName }
                            onChange={ onChange }
                        />
                    </label>
                    <label>Email:
                        <input
                            type="email"
                            name="email"
                            value={ email }
                            onChange={ onChange }
                        />
                    </label>
                    <label>Image URL:
                        <input
                            type="text"
                            name="imageUrl"
                            value={ imageUrl }
                            onChange={ onChange }
                        />
                    </label>
                    <label>G.P.A.:
                        <input
                            type="number"
                            name="gpa"
                            step={0.01}
                            min={0.00}
                            max={4.00}
                            value={ gpa }
                            onChange={ onChange }
                        />
                    </label>
                    <label>Campus:
                        <select value={ campusId || 0} name="campusId" onChange={ onChange }>
                            <option value={0}>-- none --</option>
                            {
                                campuses.map(campus => {
                                    return (
                                        <option id={ campus.id } key={ campus.id } value={ campus.id }>{ campus.name }</option>
                                    )
                                })
                            }
                        </select>
                    </label>
                    <button type='submit'>{ student.id ? 'Edit' : 'Create' }</button>
                </form> 
            </div>
        )
    }
};
const mapState = (state, { match }) => {
    const student = state.students.find(student => student.id === match.params.id*1) || {
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        gpa: 0.00,
        campusId: 0
    };
    return {
        campuses: state.campuses,
        student
    }
};
const mapDispatch = dispatch => {
    return {
        createStudent: (student) => {
            dispatch(createStudent(student))
        },
        updateStudent: (student, id) => {
            dispatch(updateStudent(student, id))
        }
    }
};
export default connect(mapState, mapDispatch)(StudentForm);

