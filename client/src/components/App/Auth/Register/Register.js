import React, { Component } from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Register.css';
import { registerUser } from '../../../../redux/actions/authActions';
import TextFiledGroup from '../../common/TextFiledGroup';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            email: '',
            password: '',
            password2: '',
            errors:{}                
         };                      
    }
    componentDidMount = ()=>{
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }
    componentWillReceiveProps = (nextProps)=>{
       if(nextProps.errors){
           this.setState({errors: nextProps.errors})
       }
    }
    submitHandelar = (event)=>{
        event.preventDefault();
        const {name,email,password,password2} = this.state;
        const newUser = {
            name: name,
            email: email,
            password: password,
            password2: password2
        }
        this.props.registerUser(newUser, this.props.history);
    }

    handleInputChange =(event)=> {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    render() {
        const {name,email,password,password2,errors} = this.state;
        const {user} = this.props.auth;
        
        return (
            <div className="register">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your DevConnector account</p>
                    <form noValidate onSubmit={this.submitHandelar}>
                        <TextFiledGroup 
                            type="text"
                            placeholder="Name" 
                            name="name" 
                            value={name}
                            onChange={this.handleInputChange}
                            error={errors.name}
                        />
                         <TextFiledGroup 
                            type="email"
                            placeholder="Email Address" 
                            name="email" 
                            value={email}
                            onChange={this.handleInputChange}
                            error={errors.email}
                            info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                        />
                        <TextFiledGroup 
                            type="password"
                            placeholder="Password" 
                            name="password" 
                            value={password}
                            onChange={this.handleInputChange}
                            error={errors.password}
                        />
                        <TextFiledGroup 
                            type="password"
                            placeholder="Confirm Password" 
                            name="password2" 
                            value={email}
                            onChange={this.handleInputChange}
                            error={errors.password2}
                        />
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = ({auth , errors}) =>{
    return{
        auth : auth,
        errors: errors.errors
    }
}
export default connect(mapStateToProps,{registerUser})(withRouter(Register));