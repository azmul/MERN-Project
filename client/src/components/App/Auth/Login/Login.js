import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {loginUser} from '../../../../redux/actions/authActions';
import TextFiledGroup from '../../common/TextFiledGroup';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            errors:{
            }
         };
    }
    componentDidMount = ()=>{
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }
    componentWillReceiveProps = (nextProps)=>{
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }else{
            if(nextProps.errors){
                this.setState({errors: nextProps.errors})
            }
        }
     }

    submitHandelar = (event)=>{
        event.preventDefault();
        const {email,password} = this.state;
        const user = {
            email: email,
            password: password
        }
        this.props.loginUser(user);
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
        const {email,password, errors} = this.state;
        const {user} = this.props;

        return (
            <div className="login">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">Sign in to your DevConnector account</p>
                    <form noValidate onSubmit={this.submitHandelar}>
                        <TextFiledGroup
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={this.handleInputChange}
                            error={errors.email}
                        />
                        <TextFiledGroup
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={this.handleInputChange}
                            error={errors.password}
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object,
    errors: PropTypes.object
}

const mapStateToProps = ({auth, errors}) =>{
    return{
        auth : auth,
        errors: errors.errors
    }
}

export default connect(mapStateToProps,{loginUser})(Login);