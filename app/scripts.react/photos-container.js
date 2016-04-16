import React, { PropTypes } from 'react'
import $ from "jquery"
import Photos from './photos.js'
import _ from 'lodash'

const PhotosContainer = React.createClass({
  html: [],
  token: '',
  getMediaRepresentation: {
    image: function ({images}) {
      return (<img src={images.standard_resolution.url} />)
    },
    video: function ({images, videos}) {
      return (
        <video width={videos.standard_resolution.width} controls poster={images.low_resolution.url} >
          <source src={videos.standard_resolution.url} type="video/mp4"/>
        </video>
      )
    }
  },
  getInitialState: function() {
    return {
      loading: true
    };
  },
  componentWillMount() {
    $.ajax(
      'https://api.instagram.com/v1/users/self/media/recent/?access_token='+this.token,
      { success: this.mediaLoaded }
    )
  },
  mediaLoaded ({data}) {
    this.html = _.map(data, (media)=> {
      return this.getMediaRepresentation[media.type](media)
    })
    this.setState({
      loading: false
    });
  },
  render () {
    if (this.state.loading) {
        return (<div> Loading component.... </div>)
    } else {
      return (
        <div>{this.html}</div>
    )}
  }
})

export default PhotosContainer
