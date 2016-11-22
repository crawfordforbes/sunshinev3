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
    $.get("http://sunshinenights.com/news", function(news){
      news.forEach(function(post){
        posts.push(post)
      })
      console.log("news")
      $.get("http://sunshinenights.com/shows", function(shows){
        shows.forEach(function(post){
          posts.push(post)
        })
        console.log("shows")
        $.get("http://sunshinenights.com/press", function(press){
          press.forEach(function(post){
            posts.push(post)
          })
          console.log("press")
          $.get("http://sunshinenights.com/videos", function(videos){
            videos.forEach(function(post){
              posts.push(post)
            })
            console.log("videos")
            $.get("http://sunshinenights.com/contact", function(contact){
              contact.forEach(function(post){
                posts.push(post)
              })
              console.log("contact")
              $.get("http://sunshinenights.com/pics", function(data){
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
	render() {

		let content;
		if(this.state.posts.length < 1){
			content = "loading..."
		} else {
			content = <Body view={this.props.view} actions={this.props.actions} posts={this.state.posts} pics={this.state.pics}/>
		}
		
		return (
			<div>
				{content}
			</div>)
	}
}

App.propTypes = {
	actions: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return {
		view: state.view
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