import React, { Component } from "react";

export default class createRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startdate: "",
      startpoint: "",
      title: "",
      description: "",
      difficulty: "",
      terraintype: "",
      lengthinkm: "",
      createdby: this.props.user,
    };
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    //pass state to parent func addNewRide
    this.props.addNewRide(this.state);
  }
  getCurrentTime() {
    let t = new Date();
    console.log(t);
    return t;
  }

  render() {
    const {
      startdate,
      startpoint,
      title,
      description,
      difficulty,
      terraintype,
      lengthinkm,
    } = this.state;
    return (
      <div>
        CREATE RIDE
        <form onSubmit={(event) => this.handleSubmit(event)}>
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => this.handleInputChange(e)}
            required
          ></input>
          Starting date and time
          <input
            type="datetime-local"
            name="startdate"
            value={startdate}
            onChange={(e) => this.handleInputChange(e)}
            required
          ></input>
          Start address{" "}
          <input
            type="text"
            name="startpoint"
            value={startpoint}
            onChange={(e) => this.handleInputChange(e)}
            required
          ></input>
          Description
          <textarea
            name="description"
            value={description}
            onChange={(e) => this.handleInputChange(e)}
            required
          ></textarea>
          Terrain type
          <input
            type="text"
            name="terraintype"
            value={terraintype}
            onChange={(e) => this.handleInputChange(e)}
            required
          ></input>
          Length (km)
          <input
            type="number"
            name="lengthinkm"
            value={lengthinkm}
            onChange={(e) => this.handleInputChange(e)}
            required
          ></input>
          Difficulty
          <input
            type="text"
            name="difficulty"
            value={difficulty}
            onChange={(e) => this.handleInputChange(e)}
            required
          ></input>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
