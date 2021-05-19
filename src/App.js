import './App.css';
import Home from './components/Home'
import Login from './components/login'
import Register from './components/register'
import Timeline from './components/dashboard/timeline'
import Four from './components/404'
import { Route, Switch } from 'react-router-dom';
import Profile from './components/dashboard/profile'
import Create_topic from './components/dashboard/create_topic'
import Room from './components/dashboard/room';
import Search from './components/dashboard/search';
import Notifications from './components/dashboard/notifications';
import Editprofile from './components/dashboard/editprofile';
import Viewprofile from './components/dashboard/viewprofile'
import ProtectedRoute from './components/protectedRoute'
import axios from 'axios'
function App() {

  return (
    <div> 
      <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/signin' component={Login} />
          <Route path='/signup' component={Register} />
          <ProtectedRoute path='/timeline' component={Timeline} />
          <ProtectedRoute path='/create-topic' component={Create_topic} />
          <ProtectedRoute path='/myprofile' component={Profile} />
          <ProtectedRoute path='/settings/editprofile' component={Editprofile} />
          <ProtectedRoute path='/search' component={Search} />
          <ProtectedRoute path='/topic/:room' component={Room} />
          <ProtectedRoute path='/notifications' component={Notifications} />
          <ProtectedRoute path='/profile/:username' component={Viewprofile} />
          <ProtectedRoute component={Four} />
      </Switch>
    </div>
  );
}

export default App;
