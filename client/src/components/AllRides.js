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
  }

  render() {
    const { rides } = this.props;
    const { sRide, joined } = this.state;
    return (
      <div>
        {/* is ride joined */}
        {/* ride joined */}
        {/* ride not joined */}

        {/* list of all */}
        <div>
          {rides.map((ride) => {
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
        {/* clicked ride */}
        <div>
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
                    <button onClick={(e) => this.joinRide(e, sRide.id)}>
                      Join
                    </button>
                  </div>
                </div>
              ) : (
                <div>not clicked - insert placeholder image here</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
