import React from "react";
import "./App.css";
import CreateRide from "./components/CreateRide";
import AllRides from "./components/AllRides";
import MyRides from "./components/MyRides";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //currently "logged in" user
      user: 1,
      rides: [],
      usersRides: [],
    };
  }

  addNewRide = async (newRide) => {
    console.log("adding new ride");
    console.log(JSON.stringify(newRide));

    try {
      const result = await fetch("/api/rides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRide),
      });
      // this.clearInputField(); // clears the input field after submitting
      const rides = await result.json();
      this.setState({
        rides: rides,
      });
    } catch (err) {
      console.log(err);
    }
  };

  userDeleted = async (ride) => {
    const { user } = this.state;
    const bodyToSend = {
      user_id: user,
      ride_id: ride.ride_id,
    };
    if (user === ride.createdby) {
      // ride created by user - sets iscompleted flag to 1, get back list of rides and usersrides
      console.log("ride created by user");
      try {
        const result = await fetch("/api/rides", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyToSend),
        });
        const rides = await result.json();
        this.setState({
          rides: rides,
        });
      } catch (err) {
        console.log(err);
      }
      //get back updated users rides
      try {
        const resU = await fetch(`/api/usersrides/${this.state.user}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const usersRides = await resU.json();
        this.setState({
          usersRides: usersRides,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      //if ride is not created by user - just delete user ride association, get back list of usersrides, change state
      try {
        const result = await fetch("/api/usersrides", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyToSend),
        });
        const usersRides = await result.json();
        this.setState({
          usersRides: usersRides,
        });
      } catch (err) {
        console.log(err);
      }
      console.log("ride not created by user");
    }
  };

  refreshUsersRides = async () => {
    try {
      const resU = await fetch(`/api/usersrides/${this.state.user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const usersRides = await resU.json();
      this.setState({
        usersRides: usersRides,
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = async () => {
    // populate rides state
    try {
      const res = await fetch("/api/rides");
      const rides = await res.json();
      this.setState({
        rides: rides,
      });
    } catch (err) {
      console.log(err);
    }
    //populate user rides state
    try {
      const resU = await fetch(`/api/usersrides/${this.state.user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const usersRides = await resU.json();

      this.setState({
        usersRides: usersRides,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { user, rides, usersRides } = this.state;
    return (
      <div className="App">
        Main app
        <div>
          <MyRides
            user={user}
            usersRides={usersRides}
            userDeleted={(ride) => this.userDeleted(ride)}
          />
          <CreateRide
            user={user}
            rides={rides}
            addNewRide={(newRide) => this.addNewRide(newRide)}
          />
          <AllRides
            user={user}
            rides={rides}
            usersRides={usersRides}
            refreshUsersRides={this.refreshUsersRides}
          />
        </div>
      </div>
    );
  }
}

export default App;
