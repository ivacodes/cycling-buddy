import React from "react";
import "./App.css";
import CreateRide from "./components/CreateRide";
import AllRides from "./components/AllRides";
import MyRides from "./components/MyRides";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 1,
    };
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <MyRides user={user} />
        <CreateRide user={user} />
        <AllRides user={user} />
      </div>
    );
  }
}

export default App;
