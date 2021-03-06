import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AuthContextComponent } from '../../context/AuthContext'
import Login from '../../routeComponents/Login/Login'
import Feed from '../../routeComponents/Feed/Feed'
import DishDetails from '../../routeComponents/DishDetails/DishDetails'
import Signup from '../../routeComponents/Signup/Signup'
import ProtectedUserRoute from '../../routeComponents/ProtectedUserRoute/ProtectedUserRoute'
import ProtectedAdminRoute from '../../routeComponents/ProtectedAdminRoute/ProtectedAdminRoute'


function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <Route exact path='/' component={Login} />
        <ProtectedUserRoute exact path='/feed' component={Feed} />
        <ProtectedUserRoute exact path='/dish/:_id' component={DishDetails} />
        <ProtectedAdminRoute exact path='/signup' component={Signup} />
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
