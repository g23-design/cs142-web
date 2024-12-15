import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import './styles/main.css';

// Компонентууд
import TopBar from './components/TopBar';
import UserDetail from './components/UserDetail';
import UserList from './components/UserList';
import UserPhotos from './components/UserPhotos';
import LoginRegister from './components/LoginRegister';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: null,  // Хэрэглэгчийн мэдээлэл
      isRegistering: false, // Бүртгэх эсвэл нэвтрэхийг тодорхойлох
    };
  }

  // Нэвтэрсэн хэрэглэгчийн мэдээллийг авах
  handleLoginUserChange = (loginUser) => this.setState({ loginUser });

  // Нэвтрэх болон бүртгэх хуудас хооронд шилжих
  toggleRegister = () => this.setState((prevState) => ({ isRegistering: !prevState.isRegistering }));

  render() {
    const { loginUser, isRegistering } = this.state;

    return (
      <HashRouter>
        <div>
          <Grid container spacing={1}>
            {/* TopBar */}
            <Grid item xs={12}>
              <TopBar loginUser={loginUser} />
            </Grid>

            <div className="cs142-main-topbar-buffer" />

            {/* Sidebar */}
            <Grid item sm={3}>
              <Paper className="side-bar" elevation={3}>
                <UserList loginUser={loginUser} />
              </Paper>
            </Grid>

            {/* Main content */}
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item" elevation={3}>
                <Switch>
                  {/* Нэвтрэх/Бүртгэх View */}
                  <Route
                    path="/login-register"
                    render={() => (
                      <LoginRegister
                        onLoginUserChange={this.handleLoginUserChange}
                        isRegistering={isRegistering}
                      />
                    )}
                  />
                  {/* Хэрэглэгчийн мэдээлэл View */}
                  <Route
                    path="/users/:userId"
                    render={() => (loginUser ? <UserDetail /> : <Redirect to="/login-register" />)}
                  />
                  {/* Фото зураг View */}
                  <Route
                    path="/photos/:userId"
                    render={() => (loginUser ? <UserPhotos /> : <Redirect to="/login-register" />)}
                  />
                  {/* Үндсэн хуудас */}
                  <Route
                    path="/"
                    render={() => (loginUser ? (
                      <Typography variant="h3">Тавтай морил, миний фото хуваалцах апп!</Typography>
                    ) : (
                      <Redirect to="/login-register" />
                    ))}
                  />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<PhotoShare />, document.getElementById('photoshareapp'));
