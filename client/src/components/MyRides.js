import React, { Component } from "react";

export default class MyRides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myRideDetails: null,
    };
  }

  onSelectRide(ride) {
    console.log(ride.id);
    this.setState({
      myRideDetails: ride,
    });
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
                key={ride.id}
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
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}
