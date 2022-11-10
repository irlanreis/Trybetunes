import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route paht="/" component={ Login } />
        <Route paht="/album/:id" component={ Album } />
        <Route paht="/search" component={ Search } />
        <Route paht="/favorites" component={ Favorites } />
        <Route paht="/profile" component={ Profile } />
        <Route paht="/profile/edit" component={ ProfileEdit } />
        <Route paht="/*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
