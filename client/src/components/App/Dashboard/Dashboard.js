import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { RingLoader } from 'react-spinners';

import {getCurrentProfile} from '../../../redux/actions/profileActions';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount = ()=>{
        this.props.getCurrentProfile();
    }
    render() {
        const { profile,loading } = this.props.profile;
        const {user} = this.props.auth;
        let dashBoardContent;

        if(profile === null || loading){
           dashBoardContent =  <RingLoader
                                    color={'#123abc'} 
                                    loading={loading} 
                                />
        }else{
            if((Object.keys(profile)).length > 0){
                dashBoardContent = <h4>Dashboard</h4>
            }else{
                dashBoardContent = 
                <div>
                    <p className="text-muted lead">Welcome {user.name}</p>
                    <p>You have not yet setup profile, please add some info</p>
                    <NavLink to="/create-profile" exact strict>
                        Create Profile
                    </NavLink>
                </div>
            }
        }
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            {dashBoardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = ({profile,auth})=>{
   return{
       profile: profile,
       auth: auth
   }
}

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);