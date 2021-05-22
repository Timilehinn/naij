import './App.css';
import Home from './components/Home'
import Login from './components/login'
import Register from './components/register'
import Timeline from './components/dashboard/timeline'
import Four from './components/404'
import { Route, Switch } from 'react-router-dom';
import Profile from './components/dashboard/Profile/profile'
import Create_topic from './components/dashboard/create_topic'
import Room from './components/dashboard/room';
import Search from './components/dashboard/search';
import Notifications from './components/dashboard/notifications';
import Editprofile from './components/dashboard/editprofile';
import Viewprofile from './components/dashboard/Viewprofile/viewprofile'
import ProtectedRoute from './components/protectedRoute'
import axios from 'axios'
function App() {

  return (
    <div> 
      <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/signin' component={Login} exact />
          <Route path='/signup' component={Register} exact />
          <ProtectedRoute path='/timeline' component={Timeline} exact />
          <ProtectedRoute path='/create-topic' component={Create_topic} exact />
          <ProtectedRoute path='/myprofile' component={Profile} exact />
          <ProtectedRoute path='/settings/editprofile' component={Editprofile} exact />
          <ProtectedRoute path='/search' component={Search} exact />
          <ProtectedRoute path='/topic/:room/:creator' component={Room} exact/>
          <ProtectedRoute path='/notifications' component={Notifications} exact />
          <ProtectedRoute path='/profile/:username' component={Viewprofile} exact />
          <Route path="*" component={Four} />
          {/* <ProtectedRoute path="/myprofile/*"  component={Profile} /> */}
      </Switch>
    </div>
  );
}

export default App;
