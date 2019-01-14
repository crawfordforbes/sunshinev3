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
    this.state = {pics: [], posts: [], loading: true, closedOverlay: false}
  }
	componentDidMount(){
    let pics;
    let posts = [];
    let that = this
    // $.get("http://sunshinenights.com/news", function(news){
    //   news.forEach(function(post){
    //     posts.push(post)
    //     that.stateSetter({posts: posts})
    //   })
      
      $.get("http://sunshinenights.com/shows", function(shows){
        shows.forEach(function(post){
          posts.push(post)
          that.stateSetter({posts: posts})
        })
        
        $.get("http://sunshinenights.com/press", function(press){
          press.forEach(function(post){
            posts.push(post)
            that.stateSetter({posts: posts})
          })
          
          $.get("http://sunshinenights.com/videos", function(videos){
            videos.forEach(function(post){
              posts.push(post)
              that.stateSetter({posts: posts})
            })
            
            $.get("http://sunshinenights.com/contact", function(contact){
              contact.forEach(function(post){
                posts.push(post)
                that.stateSetter({posts: posts})
              })
              
              $.get("http://sunshinenights.com/store", function(store){
              store.forEach(function(post){
                posts.push(post)
                that.stateSetter({posts: posts})
              })
              
	              $.get("http://sunshinenights.com/pics", function(data){
	                pics = data
	                
	                that.stateSetter({pics: pics, posts: posts, loading: false})
	                //that.setState({pics: pics, posts: posts})
	              })
	            })
            })
          })
        })
      })
    // })

    return true
  }
  stateSetter(obj){
    this.setState(obj)
  }
  toggleLoading(){
  	if(this.state.loading){
  		this.setState({loading: false})
  	}
  }
  closeOverlay(){
  	this.setState({closedOverlay: true})
  }
	render() {

		let content;
		if(!this.state.closedOverlay){
			content = <div className="overlay" onClick={()=>this.closeOverlay()}><p className="overlayX">x</p><div className="overlayText">Sunshine Nights' 4th studio album <span style={{fontWeight: "bold", fontStyle: "italic"}}>If We Stick Around</span> comes out on March 29th! We'll be playing a record release show that night at The Bitter End in New York City at 8:30.</div></div>
		} else if (this.state.loading){
			content = <p className="app">loading...</p>
		} else {
			content = <Body data={this.props.data} actions={this.props.actions} posts={this.state.posts} pics={this.state.pics}/>
		}
	// render() {
		console.log(this)
		return (
			<div>
			<h1>Sunshine Nights</h1>
				{content}
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