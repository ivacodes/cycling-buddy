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

  async deleteButtonPressed(e) {
    const { myRideDetails } = this.state;
    const { usersRides } = this.props;
    e.preventDefault();
    await this.props.userDeleted(myRideDetails);
    //when ride is deleted, empty myRideDetails as well
    this.setState({
      myRideDetails: null,
    });
  }

  render() {
    const { usersRides } = this.props;
    const { myRideDetails } = this.state;
    return (
      <div>
        <div className="row">
          <br />
        </div>
        <div className="row">
          <div className="col-6">
            {usersRides.map((ride) => {
              return (
                <div
                  key={ride.ride_id}
                  onClick={() => {
                    this.onSelectRide(ride);
                  }}
                  className="text-info mb-3"
                >
                  <strong className="h5">{ride.title}</strong>
                  <br />
                  <span className="text-muted">{ride.startdate}</span>
                  <br />
                  <span className="text-muted">{ride.startpoint}</span>
                </div>
              );
            })}
          </div>
          <div className="col-6">
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
      </div>
    );
  }
}
