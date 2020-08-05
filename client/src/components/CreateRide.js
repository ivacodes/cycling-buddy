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
        <form>
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => this.handleInputChange(e)}
          ></input>
          Starting date and time
          <input
            type="datetime-local"
            name="startdate"
            value={startdate}
            onChange={(e) => this.handleInputChange(e)}
          ></input>
          Start address{" "}
          <input
            type="text"
            name="startpoint"
            value={startpoint}
            onChange={(e) => this.handleInputChange(e)}
          ></input>
          Description
          <textarea
            name="description"
            value={description}
            onChange={(e) => this.handleInputChange(e)}
          ></textarea>
          Terrain type
          <input
            type="text"
            name="terraintype"
            value={terraintype}
            onChange={(e) => this.handleInputChange(e)}
          ></input>
          Length
          <input
            type="number"
            name="lengthinkm"
            value={lengthinkm}
            onChange={(e) => this.handleInputChange(e)}
          ></input>
          Difficulty
          <input
            type="text"
            name="difficulty"
            value={difficulty}
            onChange={(e) => this.handleInputChange(e)}
          ></input>
          <button onClick={(event) => this.handleSubmit(event)}>Add</button>
        </form>
      </div>
    );
  }
}
