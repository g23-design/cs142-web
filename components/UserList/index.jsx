import * as React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Badge,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import "./styles.css";

/**
 * UserList - A React component that displays a list of users with their photo and comment counts.
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      error: null,
    };
  }

  // Method to fetch the user list
  fetchUserList = () => {
    const url = "http://localhost:3000/user/list"; // Adjust the URL as needed

    // Fetch the user list and update the state
    axios
      .get(url)
      .then((response) => {
        console.log("** Success: fetched data from " + url + " **");
        this.setState({ users: response.data, isLoading: false });
      })
      .catch((error) => {
        console.error("** Error fetching user list: ", error);
        this.setState({
          error: "Failed to load user list. Please try again later.",
          isLoading: false,
        });
      });
  };

  // Load the user list when the component mounts
  componentDidMount() {
    this.fetchUserList();
  }

  // Handle the addition of a new user to the list
  addUserToList = (newUser) => {
    this.setState((prevState) => ({
      users: [...prevState.users, newUser],
    }));
  };

  renderUserList() {
    const { users } = this.state;

    // If no users available, return a friendly message
    if (users.length === 0) {
      return <Typography>No users available at the moment.</Typography>;
    }

    return users.map((user) => (
      <ListItem
        key={user._id}
        component={Link}
        to={`/users/${user._id}`}
        divider
        button
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ListItemText primary={`${user.first_name} ${user.last_name}`} />

        {/* Badge for Photo Count (Green) */}
        <Badge
          badgeContent={user.photoCount || 0}
          color="success"
          max={99}
          style={{ marginLeft: "25px" }}
        />

        {/* Badge for Comment Count (Red) */}
        <Badge
          badgeContent={user.commentCount || 0}
          color="error"
          max={99}
          style={{ marginLeft: "25px" }}
        />
      </ListItem>
    ));
  }

  render() {
    const { isLoading, error } = this.state;

    return (
      <Paper elevation={3} className="user-list-paper">
        <Typography variant="h4" component="h2" gutterBottom>
          User List
        </Typography>

        {isLoading && (
          <div className="loading-container">
            <CircularProgress />
            <Typography>Loading User List...</Typography>
            {/* Display skeletons while loading */}
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="rectangular" width={300} height={50} />
          </div>
        )}

        {error && (
          <Alert severity="error">
            {error}{" "}
            <Button onClick={this.fetchUserList} variant="outlined">
              Retry
            </Button>
          </Alert>
        )}

        {/* Only show user list if loading is done and no error */}
        {!isLoading && !error && (
          <List component="nav">{this.renderUserList()}</List>
        )}
      </Paper>
    );
  }
}

export default UserList;
