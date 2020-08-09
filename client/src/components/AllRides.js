import React, { Component } from "react";

const options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

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
          <div className="col-6 ml-4">
            {/* this col should be scrolablle */}
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
                  <span className="text-muted">
                    {this.props.formatDate(ride.startdate)}
                  </span>
                  <br />
                  <span className="text-muted">{ride.startpoint}</span>
                </div>
              );
            })}
          </div>
          {/* clicked ride - details*/}
          <div className="col ">
            {joined === 1 ? (
              <div className="text-info">
                You joined a ride, join another one?{" "}
              </div>
            ) : (
              <div>
                {sRide != null ? (
                  <div className="text-info mb-3">
                    <div className="h5">{sRide.title}</div>
                    <div>
                      <p className="text-muted">{sRide.description}</p>
                    </div>
                    <div>
                      <span className="text-muted">Where: </span>
                      {sRide.startpoint}
                    </div>
                    <div>
                      <span className="text-muted">When: </span>
                      {this.props.formatDate(sRide.startdate)}
                    </div>
                    <div>
                      <span className="text-muted">Length: </span>
                      {sRide.lengthinkm} km
                    </div>
                    <div>
                      <span className="text-muted">Difficulty: </span>
                      {sRide.difficulty}
                    </div>
                    <div>
                      <span className="text-muted">Terrain type: </span>
                      {sRide.terraintype}
                    </div>
                    <div>
                      {usersRides.filter((e) => e.ride_id === sRide.id).length >
                      0 ? (
                        <button
                          disabled
                          className="btn btn-outline-secondary mt-3"
                        >
                          Joined
                        </button>
                      ) : (
                        <button
                          onClick={(e) => this.joinRide(e, sRide.id)}
                          className="btn btn-outline-info mt-3"
                        >
                          Join
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-info">
                    <br />
                    <i className="fas fa-arrow-left"></i>
                    <span className="ml-4 h3">Select a ride</span> <br />
                    <i className="fas fa-arrow-left"></i>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
