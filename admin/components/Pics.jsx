import React, { Component, PropTypes } from 'react'
import $ from 'jquery'

class Pics extends Component {
  constructor(props, context) {
    super(props, context)

    
  }

  componentDidMount(){
  	

let getPics = function(){
	$.get("/pics", function(data){
		let excludedPics = data.filter(function(pic){
		return pic.carousel === 0
	})
	let includedPics = data.filter(function(pic){
		return pic.carousel > 0
	})
	let pictures = includedPics.sort(function(a, b){
		return a.carousel - b.carousel
	})

		lister(pictures);
		addListeners(pictures);
	})
}
let lister = function(pics){
	$("#js").html('')
	

	let uploadCar = pics.length + 1
	let html = "<form action='/admin/pic' encType='multipart/form-data' method='POST'><input name='file' type='file' /><input name='carousel_selection' type='hidden' value='" + uploadCar + "' /><button>Upload</button></form>"

	for(let i = 0; i<pics.length; i++){
		let newCar = i + 1;

		let	moveButton = '<button class="picmove" id="'+pics[i].id + '/'+i+'">move</button>'
		if(i % 8 === 0){
			let pageBreak = i / 8 + 1;
			html += '<div><p>Page '+ pageBreak + '</p></div>'
		}
		
		html += '<li><a href="http://www.104.236.246.211/pics/' + pics[i].url +'" target="_blank"><img class="thumb" src="../pics/' + pics[i].url +'"></a><p>http://www.104.236.246.211/pics/' + pics[i].url +'</p><p>This is currently pic number ' + newCar +' out of '+pics.length+'</p><input id="input'+pics[i].id + '" placeholder="enter order number here">'+moveButton+'</li><form action="/admin/pic/'+pics[i].id + '" method="POST"><input type="hidden" name="_method" value="delete" /><input type="hidden" name="id" value={pics[i].id} /><button>Delete</button></form> <div style="border-bottom: 1px red dashed; margin-bottom: 5px;"></div>'
	}
	html += ''
	$("#js").html(html)
}
let addListeners = function(pictures){
	$(".picmove").click(pictures, function(e){
		e.preventDefault();
		let pics = e.data;
		let id = parseInt(e.target.id.split("/")[0]);
		let oldCar = parseInt(e.target.id.split("/")[1]);

		let car = parseInt($("#input"+id).val());
		if(isNaN(car) || car < 1 || car > pics.length){
			alert("please enter a number between 1 and " + pics.length + " only, thanks!")
			return
		}
		console.log(pics)
		let tempPics = pics.splice(oldCar, 1)

		pics.splice(car - 1, 0, tempPics[0])

		for(let c = 0; c < pics.length; c++){
			pics[c].carousel = c + 1
		}
		console.log(pics)
		$.ajax({
			method: "PUT",
			url: "/admin/pics",
			data: { pics: JSON.stringify(pics) },
			success: function(data){
				console.log("pics updated")
				getPics()
			}
		})
			// let onlyNum = true
			// for(let i = 0; i<data.length; i++){
			// 	if (data[i].id === id){
			// 		data[i].carousel = car
			// 	}

				
			// 	if(data[i].id != id && data[i].carousel > oldCar){
			// 		data[i].carousel--

			// 	}
			// }
			// for(let j=0; j<data.length; j++){
			// 	if (car >= 1 && data[j].carousel === car && data[j].id != id){
			// 		onlyNum = false
			// 	}
			// 	if(!onlyNum && data[j].id != id && data[j].carousel >= car){
			// 		data[j].carousel++
			// 	}
			// }




	})
}
getPics()
  }

  
  render() {
  	

  	
    return (
    	<div>
    	
			<div id="js">
			</div>
			</div>
     )
  }
}



export default Pics
