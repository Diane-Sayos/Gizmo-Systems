import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus, updateCampus } from '../store';

class CampusForm extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            address: '',
            description: '',
            imageUrl: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    componentDidMount(){
        this.setState({
            name: this.props.campus.name,
            address: this.props.campus.address,
            description: this.props.campus.description,
            imageUrl: this.props.campus.imageUrl
        })
    };
    componentDidUpdate(prevProps){
        if(!prevProps.campus.id && this.props.campus.id){
            this.setState({
                name: this.props.campus.name,
                address: this.props.campus.address,
                description: this.props.campus.description,
                imageUrl: this.props.campus.imageUrl
            })
        }
        if(prevProps.campus.id && !this.props.campus.id){
            this.setState({
                name: '',
                address: '',
                description: '',
                imageUrl: ''
            })
        }
    };
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    };
    handleSubmit(e){
        e.preventDefault();
        if(this.props.campus.id){
            this.props.updateCampus({...this.state}, this.props.campus.id);
        } else {
            this.props.createCampus({...this.state});
            this.setState({
                name: '',
                address: '',
                description: '',
                imageUrl: ''
            });
        }
    };
    render(){
        const { name, address, description, imageUrl } = this.state;
        const { onChange, handleSubmit } = this;
        const { campus } = this.props;
        return (
            <div className='side'>
                <h3>{ campus.id ? 'UPDATE CAMPUS FORM' : 'CAMPUS FORM'}</h3>
                <form onSubmit={ handleSubmit }>
                    <label>Name:
                        <input
                            type="text"
                            name="name"
                            required
                            value={ name }
                            onChange={ onChange }
                        />
                    </label>
                    <label>Address:
                        <input
                            type="text"
                            name="address"
                            required
                            value={ address }
                            onChange={ onChange }
                        />
                    </label>
                    <label>Description:
                        <textarea
                            name="description"
                            required
                            value={ description }
                            onChange={ onChange }
                        />
                    </label>
                    <label>Image Url:
                        <input
                            name="imageUrl"
                            value={ imageUrl }
                            onChange={ onChange }
                        />
                    </label>
                    <button type='submit'>{campus.id ? 'Update' : 'Create' }</button>
                </form>
            </div>
        )
    };
};
const mapState = (state, { match }) => {
    const campus = state.campuses.find(campus => campus.id === match.params.id*1) || {
        name: '',
        address: '',
        imageUrl: '',
        description: ''
    }
    return {
        campus
    }
};
const mapDispatch = dispatch => {
    return {
        createCampus: (campus) => {
            dispatch(createCampus(campus))
        },
        updateCampus: (campus, id) => {
            dispatch(updateCampus(campus, id))
        }
    }
};
export default connect(mapState, mapDispatch)(CampusForm);