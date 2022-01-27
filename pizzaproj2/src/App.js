import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Registration from './components/Registration.js';
import Login from './components/Login.js'
import Dashboard from './components/Dashboard';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Profile from './components/Profile'
// import store from "./store"
// import { Provider } from 'react-redux'
function App() {
  return (
    // <Provider store={store}>
    <div >
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/regis" exact element={<Registration />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>

    </div>
    // </Provider>
  );
}

export default App;
