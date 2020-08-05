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
    };
  }

  addNewRide = async (newRide) => {
    //send ride to db
    //get new list of rides
    //update state of rides
  };

  componentDidMount = async () => {
    try {
      const res = await fetch("/api/rides");
      const rides = await res.json();
      this.setState({
        rides: rides,
      });
    } catch (err) {
      // upon failure, show error message
      console.log(err);
    }
  };

  render() {
    const { user, rides } = this.state;
    return (
      <div className="App">
        Main app
        <div>
          {/* <MyRides user={user} rides={rides} /> */}
          <CreateRide
            user={user}
            rides={rides}
            addNewRide={(newRide) => this.addNewRide(newRide)}
          />
          {/* <AllRides user={user} rides={rides} /> */}
        </div>
      </div>
    );
  }
}

export default App;
