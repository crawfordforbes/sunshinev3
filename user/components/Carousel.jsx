import React, {Component, PropTypes} from 'react'

class Carousel extends Component {
	constructor(props, context) {
		super(props, context)

		let pics = this.props.pics;
		
		let picsTotal = pics.length;
		let numPerPage = 8;
		let overflow = picsTotal % numPerPage > 0 ? 1 : 0;
		let totalPages = Math.floor(picsTotal / numPerPage) + overflow;
		this.state = {numPerPage: numPerPage, totalPages: totalPages, currentPage: 1, currentImage: false}
	}
	makeCurrent(e){
		this.setState({currentImage: e.target.src})
	}
	columnify(pics){
		let that = this
		return pics.map(function(pic){
			//let url = "http://www.sunshinenights.com/" + pic.url
			let url = "http://127.0.0.1:4567/" + pic.url
			return (
				<div className="col-xs-3 thumbContainer" key={"pic"+pic.id}>
					<img className="thumbnail" onClick={that.makeCurrent.bind(that)} src={url} />
				</div>
			)
		
		})
	}
	pics(){
		let img = this.state.currentImage;
		let pics = this.props.pics;
		let numPerPage = this.state.numPerPage;
		let picsTotal = pics.length;
		let page = this.state.currentPage;
		let picsOnPage = pics.filter(function(pic){
			console.log(pic)
			return pic.carousel > (page - 1) * numPerPage && pic.carousel <= page * numPerPage
		})
		
		// console.log(picsOnPage.slice(0,4))
		// console.log(picsOnPage.slice(4,8))
		// console.log(picsOnPage.slice(8))
		console.log(picsOnPage.length)
		return (
			<div className="picRowWrapper">
				<div className="row picRow">
					{this.columnify(picsOnPage.slice(0,4))}
				</div>
				<div className="row picRow">
					{this.columnify(picsOnPage.slice(4,8))}
				</div>

			</div>
		)
	}
	nav(){
		let first;
		let previous;
		let next;
		let last;
		let page = this.state.currentPage;
		if(this.state.currentPage > 1){
			previous = <div className="col-xs-3 leftArrow carouselNav" onClick={this.decrement.bind(this)} style={{textAlign: "center", fontSize: "20px"}}>previous page</div>
			first = <div className="col-xs-3  leftArrow carouselNav" onClick={this.goToPage.bind(this)} style={{textAlign: "center", fontSize: "20px"}}>first page</div>
		} else {
			previous = <div className="col-xs-3 leftArrow carouselNav" style={{color: "grey", textAlign: "center", fontSize: "20px"}}>previous page</div>
			first = <div className="col-xs-3  leftArrow carouselNav" style={{color: "grey", textAlign: "center", fontSize: "20px"}}>first page</div>
		}
		if(this.state.currentPage < this.state.totalPages){
			next = <div className="col-xs-3 rightArrow carouselNav" onClick={this.increment.bind(this)} style={{fontSize: "20px", textAlign: "center"}}>next page</div>
			last = <div className="col-xs-3 rightArrow carouselNav" onClick={this.goToPage.bind(this)} style={{fontSize: "20px", textAlign: "center"}}>last page</div>
		} else {
			next = <div className="col-xs-3 rightArrow carouselNav" style={{color: "grey", fontSize: "20px", textAlign: "center"}}>next page</div>
			last = <div className="col-xs-3 rightArrow carouselNav" style={{color: "grey", fontSize: "20px", textAlign: "center"}}>last page</div>
		}
		// let nums;
		// let greyStyle = {margin: "0 5px", textAlign: "center", display: "inline-block", width: "30px", height: "30px", border: "red solid 1px", borderRadius: "3px", color: "grey"}
		// let numStyle = {margin: "0 5px", textAlign: "center", display: "inline-block", width: "30px", height: "30px", border: "red solid 1px", borderRadius: "3px"}
		// if(this.state.currentPage === 1){
		// 	nums = <div className="col-xs-2"><div style={greyStyle}>1</div><div onClick={this.goToPage.bind(this)} style={numStyle}>2</div><div onClick={this.goToPage.bind(this)} style={numStyle}>3</div><div onClick={this.goToPage.bind(this)} style={numStyle}>4</div><div onClick={this.goToPage.bind(this)} style={numStyle}>5</div></div>
		// } 
		return (
			<div className="carouselNavRow">
			{first}
			{previous}
			{next}
			{last}
			</div>
			)
	}
	increment(){
		
		let current = this.state.currentPage + 1;
		this.setState({currentPage: current})
	}
	decrement(){
		
		let current = this.state.currentPage - 1;
		this.setState({currentPage: current})
	}
	goToPage(e){
		let num;
		if(e.target.innerHTML === "first page"){
			num = 1;
		} else {
			num = this.state.totalPages;
		}
		this.setState({currentPage: num})
	}
	render() {
		let current;
		if(this.state.currentImage){
			current = <div className="row" style={{marginBottom: "15px", overflow: "auto"}}><img id="currentImage" src={this.state.currentImage} /></div>
		}
		return(
			<div>
				<div>
					{current}
					{this.pics()}
				</div>
				
				{this.nav()}
				
			</div>)
	}
}

export default Carousel