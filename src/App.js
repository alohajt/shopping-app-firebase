import React, { Component } from 'react';
import './reset.css'
import './App.css';

import {
  Link,
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// import uuid from 'uuid/v1'
import { v4 as uuidv4 } from 'uuid';

const fakeApi = {
  //全部商品列表
  list: [{
    name: "Apple iPad Pro (12.9-inch, Wi-Fi + Cellular, 1TB) - Space Gray (4th Generation)",
    price: "$1649",
    img: "https://images-na.ssl-images-amazon.com/images/I/81Pi4nhjlwL._AC_SL1500_.jpg",
    id: uuidv4()
  },
  {
    name: "Apple AirPods Pro",
    price: "$229.95",
    img: "https://images-na.ssl-images-amazon.com/images/I/71zny7BTRlL._AC_SL1500_.jpg",
    id: uuidv4()
  },
  {
    name: "Apple Watch Series 3 (GPS, 38mm) - Space Gray Aluminum Case with Black Sport Band",
    price: "$169",
    img: "https://images-na.ssl-images-amazon.com/images/I/71fwbMm1NBL._AC_SL1500_.jpg",
    id: uuidv4()
  },
  {
    name: "Apple MacBook Air (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray (Latest Model)",
    price: "$949.00",
    img: "https://images-na.ssl-images-amazon.com/images/I/71k3fJh5EwL._AC_SX679_.jpg",
    id: uuidv4()
  },
  {
    name: "App Store & iTunes Gift Cards - Email Delivery",
    price: "$25 - $100",
    img: "https://images-na.ssl-images-amazon.com/images/I/51f90ufUD9L.jpg",
    id: uuidv4()
  }
  ],
  //购物车里的商品列表
  shoppingCar: [],

  //获取全部商品
  getList: function (callback) {
    callback(this.list)
  },

  //获取某个商品详情
  getDetail: function (id, callback) {
    callback(
      this.list.filter(e => e.id === id)[0]
    )
  },

  add: function (id, callback) {
    this.shoppingCar.push(
      this.list.filter(e => e.id === id)[0]
    )
    callback({ code: 200, msg: "added yes" })
  },

  getShoppingCar: function (callback) {
    callback(
      this.shoppingCar
    )
  }
}

class BottomBar extends Component {
  render() {
    return (
      <div className="bottom-bar">
        <Link className="bottom-bar-button" to="/">Home</Link>
        <Link className="bottom-bar-button" to="/shopping_car">Shopping Cart</Link>
      </div>
    )
  }
}

class Nav extends Component {
  render() {
    return (
      <Route
        path="/"
        children={(routeProps) => {
          var isRenderButton = routeProps.location.pathname === '/' ? false : true
          var pathname = routeProps.location.pathname
          var pageName = ""
          switch (pathname) {
            case "/":
              pageName = "Home"
              break
            case "/shopping_car":
              pageName = "Shopping Cart"
              break
            case "/list":
              pageName = "Product List"
              break
            default:
              pageName = "Product"
            // pageName = "No such page 404"
          }
          return (
            <div className="nav">
              {
                isRenderButton ? (
                  <button className="goback" onClick={routeProps.history.goBack}>{"<"}</button>
                ) : ""
              }
              <p className="page-title">{pageName}</p>
            </div>
          )
        }}>
      </Route>
    )
  }
}

class IndexView extends Component {
  render() {
    return (
      <ul>
        <li className="index-item">
          <Link to="/list" className="index-item-link">Enter Apple Products</Link>
        </li>
      </ul>
    )
  }
}

class ListView extends Component {
  state = {
    data: []
  }
  componentWillMount() {
    fakeApi.getList((data) => {
      this.setState({
        data: data
      })
    })
  }
  render() {
    const { data } = this.state
    return (
      <ul className="list">
        {
          data.map((v, k) => (
            <li key={v.id}>
              <Link to={`/detail/${v.id}`} className="item">
                <img className="item-img" src={v.img} alt=""></img>
                <div className="item-wrap">
                  <p className="item-name">{v.name}</p>
                  <p className="item-price">{v.price}</p>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    )
  }
}

class DetailView extends Component {
  state = {
    data: {}
  }
  componentWillMount() {
    var id = this.props.match.params.id
    console.log(id);
    fakeApi.getDetail(id, (data) => {
      this.setState({
        data: data ? data : {}
      })
    })
  }
  onAddToShoppingCar(id) {
    fakeApi.add(id, () => {
      this.props.history.push('/shopping_car') //Link
    })
  }
  render() {
    const { data } = this.state
    return (
      <div className="detail-view">
        <img className="detail-img" src={data.img}></img>
        <h4 className="detail-name">{data.name}</h4>
        <p className="detail-price">{data.price}</p>
        <div className="bottom-bar">
          <button className="bottom-button" onClick={() => this.onAddToShoppingCar(data.id)}>Add to Cart</button>
          <button className="bottom-button" id="buynow">Buy Now</button>
        </div>
      </div>
    )
  }
}

class ShoppingCarView extends Component {
  state = {
    data: []
  }
  componentWillMount() {
    fakeApi.getShoppingCar((data) => {
      this.setState({
        data: data
      })
    })
  }

  render() {
    const { data } = this.state
    return (
      <ul className="shopping-view">
        {
          data.map((v, k) => (
            <Link to={`/detail/${v.id}`} key={v.id + k}>
              <li className="shopping-item">
                <img className="item-img" src={v.img}></img>
                <div className="item-wrap">
                  <p className="item-name">{v.name}</p>
                  <p className="item-price">{v.price}</p>
                </div>
              </li>
            </Link>

          ))
        }
      </ul>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav></Nav>
          <div className="App-main-view">
            <Route className="main-view" path="/" exact component={IndexView}></Route>
            <Route className="main-view" path="/list" exact component={ListView}></Route>
            <Route className="main-view" path="/detail/:id" exact component={DetailView}></Route>
            <Route className="main-view" path="/shopping_car" exact component={ShoppingCarView}></Route>
          </div>
          <Route path="/" exact component={BottomBar}></Route>
        </div>
      </Router>

    )
  }
}
export default App;
