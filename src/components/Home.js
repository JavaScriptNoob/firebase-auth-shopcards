import React, { Component } from "react";

import withAuthorization from "./withAuthorization";
import { db } from "../firebase";
import EventsBase from "./Eventsbase"
class HomePage extends Component {
  state = {
    users: null,
    username: "",
    loading: true
  };

  componentDidMount() {
    // db.onceGetUsers().then(res => {
    //   this.setState({
    //     users: res.val()
    //   });
    // });

    const { loggedUser } = this.props;
    db.doGetAnUnser(loggedUser.uid).then(res => {
      this.setState({
        username: res.val().username,
        loading: false
      });
      console.log(res.val())
    });
  }

  render() {
    const { users, username, loading } = this.state;
    // console.log("dasdf", this.props.loggedUser);
    return (
      <div>
        <h1 className="mainHead">EVENTOMANIA</h1>
        {!loading && <p className="centered">Hello {username}!</p>}

        <p style={{ marginTop: "80px" }}>
          NOTE: This page is only accessible by signed in users.
        </p>
        {/* {!!users && <UserList users={users} />} */}
        <EventsBase/>
      </div>
    );
  }
}

// const UserList = ({ users }) => (
//   <div>
//     {console.log("users", users)}
//     <h2>List of Usernames of Users</h2>
//     <p>(Saved on Sign Up in Firebase Database)</p>

//     {Object.keys(users).map(key => (
//       <div key={key}>{users[key].username}</div>
//     ))}
//   </div>
// );

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage); //grants authorization to open endpoint if an user is signed in
