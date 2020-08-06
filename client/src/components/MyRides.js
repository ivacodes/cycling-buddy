import React, { Component } from "react";

export default class MyRides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myRideDetails: null,
    };
  }

  onSelectRide(ride) {
    console.log(ride.ride_id);
    this.setState({
      myRideDetails: ride,
    });
  }

  deleteButtonPressed(e) {
    const { myRideDetails } = this.state;
    const { usersRides } = this.props;
    e.preventDefault();
    this.props.userDeleted(myRideDetails);
    //if all rides are deleted, empty myRideDetails as well
    if (!usersRides) {
      this.setState({
        myRideDetails: null,
      });
    }
  }

  render() {
    const { usersRides } = this.props;
    const { myRideDetails } = this.state;
    return (
      <div>
        LIST OF MY RIDES
        <div>
          {usersRides.map((ride) => {
            return (
              <div
                key={ride.ride_id}
                onClick={() => {
                  this.onSelectRide(ride);
                }}
              >
                <strong>{ride.title}</strong>
                <br />
                <em>{ride.description}</em>
              </div>
            );
          })}
        </div>
        details{" "}
        <div>
          {myRideDetails != null ? (
            <div>
              <div>{myRideDetails.title}</div>
              <div>
                <p>{myRideDetails.description}</p>
              </div>
              <div>
                <span>Where: </span>
                {myRideDetails.startpoint}
              </div>
              <div>
                <span>When: </span>
                {myRideDetails.startdate}
              </div>
              <div>
                <span>Length: </span>
                {myRideDetails.lengthinkm} km
              </div>
              <div>
                <span>Difficulty: </span>
                {myRideDetails.difficulty}
              </div>
              <div>
                <span>Terrain type: </span>
                {myRideDetails.terraintype}
              </div>
              <button
                onClick={(e) => {
                  this.deleteButtonPressed(e);
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}
