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
    this.clearInput();
  }

  clearInput() {
    this.setState({
      startdate: "",
      startpoint: "",
      title: "",
      description: "",
      difficulty: "",
      terraintype: "",
      lengthinkm: "",
    });
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
    const { rideCreated } = this.props;
    return (
      <div>
        <div className="row">
          <br />
        </div>
        <div className="row text-info">
          <div className="col">
            {rideCreated ? (
              <div>
                Ride created, create another one?{" "}
                <button
                  onClick={(e) => this.props.createAnother(e)}
                  className="btn btn-outline-info mt-3"
                >
                  Yes
                </button>
              </div>
            ) : (
              <form
                onSubmit={(event) => this.handleSubmit(event)}
                className="mb-4"
              >
                <div className="form-group row">
                  <div className="col">
                    Title
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => this.handleInputChange(e)}
                      required
                      className="form-control mb-1"
                    ></input>
                    Starting date and time
                    <input
                      type="datetime-local"
                      name="startdate"
                      value={startdate}
                      onChange={(e) => this.handleInputChange(e)}
                      required
                      className="form-control mb-1"
                    ></input>
                    Start address{" "}
                    <input
                      type="text"
                      name="startpoint"
                      value={startpoint}
                      onChange={(e) => this.handleInputChange(e)}
                      required
                      className="form-control mb-1"
                    ></input>
                    Terrain type
                    <input
                      type="text"
                      name="terraintype"
                      value={terraintype}
                      onChange={(e) => this.handleInputChange(e)}
                      required
                      className="form-control mb-1"
                    ></input>
                    Length (km)
                    <input
                      type="number"
                      name="lengthinkm"
                      value={lengthinkm}
                      onChange={(e) => this.handleInputChange(e)}
                      required
                      className="form-control mb-1"
                    ></input>
                    Difficulty
                    <input
                      type="text"
                      name="difficulty"
                      value={difficulty}
                      onChange={(e) => this.handleInputChange(e)}
                      required
                      className="form-control mb-1"
                    ></input>
                  </div>
                  <div className="col-6">
                    Description
                    <textarea
                      rows="10"
                      name="description"
                      value={description}
                      onChange={(e) => this.handleInputChange(e)}
                      required
                      className="form-control mb-1"
                    ></textarea>
                    <p className="text-muted">*All fields are mandatory</p>
                  </div>
                </div>

                <button type="submit" className="btn btn-outline-info mt-3">
                  Add
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}
