import "./About.css";
import profile_pic from "../assets/profile_pic.jpg";
import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div>
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Chengnan Li</div>
            <div className="brief_description">
              I am an incoming sophomore majoring in computer science at
              UW-Madison. My interests include basketball, playing piano,
              watching TV Shows, and cooking. Fun fact: I have went skydiving
              before.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
