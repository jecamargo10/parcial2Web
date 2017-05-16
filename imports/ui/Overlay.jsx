import React, { Component } from 'react';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
    this.canvas= null;
  }

getmyProjection()
{}


componentWillUpdate(nextprops)
{
 algo = nextprops.getProjection();

nextprops.tweets.map((tweet) => {
  algo(nextprops.tweet.coordinates)  ;
});


}

render()


{


  return(<canvas
ref={(canvas) => {this.canvas=canvas}}/>
   )
}



}
