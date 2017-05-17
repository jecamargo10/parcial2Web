import React, { Component } from 'react';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
    this.canvas= null;
    this.arr = [];
    this.state ={ };

  }



componentWillUpdate(nextprops)
{
//  console.log(nextprops);
var algo = nextprops.getProjection;

var canvas = this.refs.canvas;

    var pointSize = 3; // Change according to the size of the point.
    var ctx = canvas.getContext("2d");
    ctx.canvas.width  = 600;
    ctx.canvas.height = 600;
      console.log(window.innerWidth);
      console.log(window.innerHeight);


    ctx.fillStyle = "#ff2626"; // Red color



if(nextprops.tweets)
{
  var agrego =false;
if (this.arr.length === 0)
{
  //comienzo
  this.arr = this.arr.concat(nextprops.tweets);
console.log(this.arr);
}
else
{
//agrego el ultimo
 this.arr.push(nextprops.tweets[nextprops.tweets.length-1]);
 console.log(this.arr);
}




  this.arr.map((tweet) => {
  //  var coordenadas = algo(tweet.coordinates)  ;
    var algo = nextprops.getProjection(tweet.coordinates);
    console.log(puntos);
    var puntos =algo(tweet.coordinates.coordinates);
    ctx.beginPath(); //Start path
    ctx.arc(puntos[0], puntos[1], pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.
    console.log(puntos);





    function draw(e) {
      var pos = getMousePos(canvas, e);
      posx = pos.x;
      posy = pos.y;
      if(posx -  puntos[0]< 10 && posy -  puntos[1]< 10)
      {
        console.log(tweet)
        document.getElementById("p1").innerHTML = tweet.text;

        var edit_save = document.getElementById("profile");

              edit_save.src = tweet.user.profile_image_url;



      }
    }
    canvas.addEventListener('click', draw, false);

    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }



});
}


}



render()


{


  return(<canvas
ref="canvas" />
   )
}



}
