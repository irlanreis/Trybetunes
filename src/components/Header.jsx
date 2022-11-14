import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    nameUser: '',
    isLoading: true,
  };

  async componentDidMount() {
    const name = await getUser();

    this.setState({
      nameUser: name,
      isLoading: false,
    });
  }

  render() {
    const { nameUser, isLoading } = this.state;

    return (
      <div data-testid="header-component">
        {
          isLoading ? <Loading /> : (
            <div data-testid="header-user-name">
              {nameUser.name}
            </div>
          )
        }
      </div>
    );
  }
}
export default Header;
