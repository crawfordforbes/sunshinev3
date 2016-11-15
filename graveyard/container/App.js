import React, {Component, PropTypes} from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../store'
import Body from '../components/Body'
import * as OtherActions from '../actions/index'
import $ from 'jquery'
class App extends Component {
	constructor(props, context) {
    super(props, context)
    this.state = {pics: [], posts: []}
  }
	componentDidMount(){
    let pics;
    let posts = [];
    let that = this
    $.get("http://http://104.236.246.211//news", function(news){
      news.forEach(function(post){
        posts.push(post)
      })
      console.log("news")
      $.get("http://http://104.236.246.211//shows", function(shows){
        shows.forEach(function(post){
          posts.push(post)
        })
        console.log("shows")
        $.get("http://http://104.236.246.211//press", function(press){
          press.forEach(function(post){
            posts.push(post)
          })
          console.log("press")
          $.get("http://http://104.236.246.211//videos", function(videos){
            videos.forEach(function(post){
              posts.push(post)
            })
            console.log("videos")
            $.get("http://http://104.236.246.211//contact", function(contact){
              contact.forEach(function(post){
                posts.push(post)
              })
              console.log("contact")
              $.get("http://http://104.236.246.211//pics", function(data){
                pics = data
                console.log("pics")
                that.stateSetter({pics: pics, posts: posts})
                //that.setState({pics: pics, posts: posts})
              })
            })
          })
        })
      })
    })

    return true
  }
  stateSetter(obj){
    this.setState(obj)
  }
	render() {let content;
		if(this.state.posts.length < 1){
			content = "loading..."
		} else {
			content = <Body data={this.props.data} actions={this.props.actions} posts={this.state.posts} pics={this.state.pics}/>
		}
		// const {data, actions} = this.props
		return (
			<div>
				{content}
			</div>)
	}
}

App.propTypes = {
	actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		data: state
	}
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(OtherActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(App)