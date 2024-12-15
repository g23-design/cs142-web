import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from 'axios';  // Importing Axios
import "./styles.css";

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true,
    };
  }

  /**
   * Fetch user details from the API
   * @param {string} userId - ID of the user to fetch
   */
  fetchUserData(userId) {
    this.setState({ isLoading: true });
    axios.get(`/user/${userId}`)
      .then((response) => {
        this.setState({ user: response.data, isLoading: false });
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        this.setState({ user: null, isLoading: false });
      });
  }

  /**
   * Fetch user data when the component mounts
   */
  componentDidMount() {
    const { userId } = this.props.match.params;
    this.fetchUserData(userId);
  }

  /**
   * Re-fetch user data if the route parameter changes
   */
  componentDidUpdate(prevProps) {
    const { userId } = this.props.match.params;
    if (userId !== prevProps.match.params.userId) {
      this.fetchUserData(userId);
    }
  }

  render() {
    const { user, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <div>User not found</div>;
    }

    return (
      <div className="user-detail">
        <Typography variant="h4">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body1">Location: {user.location}</Typography>
        <Typography variant="body1">Description: {user.description}</Typography>
        <Typography variant="body1">Occupation: {user.occupation}</Typography>

        {/* Link to the user's photos */}
        <Link to={`/photos/${user._id}`}>View Photos of {user.first_name}</Link>
      </div>
    );
  }
}

export default UserDetail;
