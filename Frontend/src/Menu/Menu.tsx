import React, { useState } from 'react';
import SideBar from './Sidebar.tsx';

import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

class Menu extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      fullmenu: null, // formatting of menu
      cart: {}, // shopping cart dictionary cart[id]={name, price, count}
      sidebarOpen: false,
    };
    this.populate = this.populate.bind(this);
  }

  // original source link in Sidebar.tsx
  toggleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  // runs when component mounts (essentially compiles), will (probably?)
  // not run when switching urls, so if new menu item is added, this.populate
  // will need to be recalled
  componentDidMount() {
    this.populate();
  }

  // used to check if dictionary is empty,
  // from: https://stackoverflow.com/questions/6072590/how-to-match-an-empty-dictionary-in-javascript
  isEmpty(ob) {
    for (var i in ob) {
      return false;
    }
    return true;
  }

  // increments given item count in shopping cart
  incrCount(id) {
    // originally
    //  this.state.cart[id].count = this.state.cart[id].count + 1;
    // but to trigger rerender, setState is needed, and individual dict
    // items cannot be edited via setState, so entire dict is copied
    // code from: https://forum.freecodecamp.org/t/reactjs-using-setstate-to-update-a-single-property-on-an-object/146772/2
    const cartCopy = JSON.parse(JSON.stringify(this.state.cart));
    cartCopy[id].count = cartCopy[id].count + 1;
    this.setState({
      cart: cartCopy,
    });
  }

  showOrders() {
    if (this.isEmpty(this.state.cart)) {
      return <p>Loading</p>;
    } else {
      //console.log('1' in this.state.cart); true
      //console.log('18' in this.state.cart); false
      const data = this.state.cart;
      return (
        <div className="menuCart">
          <ul>
            {Object.keys(data).map((key) => {
              if (data[key].count > 0) {
                return (
                  <li>
                    {data[key].count}x {data[key].name}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      );
    }
  }

  populate() {
    fetch('/testmenu.json', { method: 'GET' }) // url to access, GET call
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        // in case shopping cart still exists (e.g. went from shopping cart
        //    back to menu, preserve shopping cart but reload menu)
        if (this.isEmpty(this.state.cart)) {
          {
            data.map((menuItem) => {
              const { id, item_name, cost } = menuItem;
              this.state.cart[id] = {
                name: item_name,
                price: cost,
                count: 0,
              };
            });
          }
        }

        // create frontend menu layout
        this.setState({
          fullmenu: (
            <div className="menu">
              {data.map((menuItem) => {
                const { id, item_name, cost, description } = menuItem;
                return (
                  <article key={id} className="menuItem">
                    <button
                      key={item_name}
                      className="menuButton"
                      onClick={() => this.incrCount(id)}
                    >
                      {item_name}
                    </button>
                    <div className="itemInfo">
                      <header>
                        <h4 className="cost">${cost}</h4>
                      </header>
                      <p className="description">{description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          ),
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error('Error in get count.', error);
      });
  }

  render() {
    return (
      <>
        <div className="menu_header">
          <span>
            <button className="return_button">
              <FaArrowLeft />
            </button>
          </span>
          <span>
            <button
              className="cart_button"
              onClick={() => this.toggleSidebar()}
            >
              <FaShoppingCart />
            </button>
          </span>
        </div>
        <SideBar isOpen={this.state.sidebarOpen} data={this.showOrders()} />
        <div className="menu">{this.state?.fullmenu ?? 'Loading'}</div>
      </>
    );
  }
}

export default Menu;