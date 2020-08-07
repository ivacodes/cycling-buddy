import React, { Component } from "react";

export default class AllRides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sRide: null,
      joined: null,
    };
  }

  onSelectRide(ride) {
    console.log(ride.id);
    this.setState({
      sRide: ride,
      joined: null,
    });
  }

  async joinRide(e, id) {
    e.preventDefault();
    //constructing body of request
    const userRide = {
      user_id: this.props.user,
      ride_id: id,
    };
    console.log("joining ride", id);
    try {
      await fetch("/api/usersrides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRide),
      });
    } catch (err) {
      console.log(err);
    }
    this.setState({
      joined: 1,
    });
    // after joining, refresh usersrides list
    this.props.refreshUsersRides();
  }

  render() {
    const { rides, usersRides } = this.props;
    const { sRide, joined } = this.state;
    return (
      <div>
        <div className="row">
          {/* is ride joined */}
          {/* ride joined */}
          {/* ride not joined */}
          <br />
        </div>
        <div className="row">
          {/* list of all */}
          <div className="col-6">
            {/* <p className="text-muted">Click to see details</p> */}
            {rides.map((ride) => {
              return (
                <div
                  key={ride.id}
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
          {/* clicked ride - details*/}
          <div className="col">
            {joined === 1 ? (
              <div>You joined a ride, join another one? </div>
            ) : (
              <div>
                {sRide != null ? (
                  <div>
                    <div>{sRide.title}</div>
                    <div>
                      <p>{sRide.description}</p>
                    </div>
                    <div>
                      <span>Where: </span>
                      {sRide.startpoint}
                    </div>
                    <div>
                      <span>When: </span>
                      {sRide.startdate}
                    </div>
                    <div>
                      <span>Length: </span>
                      {sRide.lengthinkm} km
                    </div>
                    <div>
                      <span>Difficulty: </span>
                      {sRide.difficulty}
                    </div>
                    <div>
                      <span>Terrain type: </span>
                      {sRide.terraintype}
                    </div>
                    <div>
                      {usersRides.filter((e) => e.ride_id === sRide.id).length >
                      0 ? (
                        <button disabled>Joined</button>
                      ) : (
                        <button onClick={(e) => this.joinRide(e, sRide.id)}>
                          Join
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>not clicked - insert placeholder image here</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
