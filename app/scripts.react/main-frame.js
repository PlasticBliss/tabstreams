import React, { PropTypes } from 'react'
import $ from "jquery"
import PhotosContainer from './photos-container.js'

const MainFrame = React.createClass({
  token: 'oauth-token',
  componentWillMount() {
    $.ajax(
      'https://api.instagram.com/v1/users/self/?access_token=' + this.token,
      { success: this.profileLoaded }
    )
  },
  getInitialState: function() {
    return {
      fullname:'',
      profilePicture:'',
      username:'',
      counts:'',
      loading: true
    };
  },
  profileLoaded ({data}) {
    this.setState({
      fullname: data.full_name,
      profilePicture: data.profile_picture,
      username: data.username,
      counts: data.counts,
      loading: false
    })
  },
  render () {
    if (this.state.loading) {
      return (<div> Loading component.... </div>)
    } else {
      return (
        <div>
          <img src={this.state.profilePicture}/><br/>
          <span>@{this.state.username}</span><br/>
          <span>{this.state.fullname}</span><br/>
          <div>
            <span>followers</span><span>{this.state.counts.followed_by}</span><br/>
            <span>following</span><span>{this.state.counts.follows}</span>
          </div>
          <PhotosContainer/>
        </div>
      )
    }
  }
})

export default MainFrame
