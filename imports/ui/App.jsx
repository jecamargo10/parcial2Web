import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../api/Tweets.js";
import ColombiaMap from "./ColombiaMap.jsx";
import Overlay from "./Overlay.jsx";

export class App extends Component {
  constructor(props) {
    super(props);
    this.projection=null;
  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;

    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);

  }

getProjection()
{
  return this.projection;

}
setProjection(newprojection)
{
this.projection=newprojection;

}




  render() {
    console.log("render!");
    return (
      <div>
        <input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
        { this.props && this.props.err ?
          <div>Error: {this.props.err}</div> :
          <span></span>
        }
        <h2>Map of Colombia</h2>
        <Overlay
          width="600"
          height="600"
          getProjection={this.getProjection.bind(this)}
          tweets={this.props.tweets}


        ></Overlay>
        <ColombiaMap
          width="600"
          height="600"
          data={{}}
          setProjection={this.setProjection.bind(this)}

        ></ColombiaMap>



        <h2>Results:</h2>
        {this.props && this.props.tweets ?
          <TweetsResults tweets={this.props.tweets}/> :
          <p>Enter a query</p>
        }

      </div>
    );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");


  return {
    tweets: Tweets.find({}).fetch()
  };
}, App);
