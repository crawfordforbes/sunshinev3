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
    this.state = {pics: [], posts: [], loading: true}
  }
	componentDidMount(){
    let pics;
    let posts = [];
    let that = this
    $.get("http://104.236.246.211/news", function(news){
      news.forEach(function(post){
        posts.push(post)
      })
      
      $.get("http://104.236.246.211/shows", function(shows){
        shows.forEach(function(post){
          posts.push(post)
        })
        
        $.get("http://104.236.246.211/press", function(press){
          press.forEach(function(post){
            posts.push(post)
          })
          
          $.get("http://104.236.246.211/videos", function(videos){
            videos.forEach(function(post){
              posts.push(post)
            })
            
            $.get("http://104.236.246.211/contact", function(contact){
              contact.forEach(function(post){
                posts.push(post)
              })
              
              $.get("http://104.236.246.211/store", function(store){
              store.forEach(function(post){
                posts.push(post)
              })
              
	              $.get("http://104.236.246.211/pics", function(data){
	                pics = data
	                
	                that.stateSetter({pics: pics, posts: posts})
	                //that.setState({pics: pics, posts: posts})
	              })
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
 //  toggleLoading(){
 //  	if(this.state.loading){
 //  		this.setState({loading: false})
 //  	}
 //  }
	// render() {

	// 	let content;
	// 	if(this.state.loading){
	// 		content = <div className="overlay" onClick={()=>this.toggleLoading()}><p className="overlayX">x</p><a className="overlayLink" href="#" target="_blank"><div className="overlayText">Click here to preorder Sunshine's new record A Brooklyn Biography.</div></a></div>
	// 	} else if (this.state.posts.length < 1){
	// 		content = <p>loading...</p>
	// 	} else {
	// 		content = <Body data={this.props.data} actions={this.props.actions} posts={this.state.posts} pics={this.state.pics}/>
	// 	}
	render() {
		//console.log(this)
		return (
			<div>
			<h1>Sunshine Nights</h1>
				<Body data={this.props.data} actions={this.props.actions} posts={this.state.posts} pics={this.state.pics}/>
			</div>)
	}
}

App.propTypes = {
	actions: PropTypes.object.isRequired,

}

function mapStateToProps(state) {
	return {
		data: state.data,
		loading: state.loading
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