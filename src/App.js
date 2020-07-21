import React, { Component } from 'react';
import './App.css';

import {
  Link,
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const fakeApi = {
  //全部商品列表
  list: [{
    name: "Apple iPhone 11 Pro (64GB, Midnight Green) [Carrier Locked] + Carrier Subscription [Cricket Wireless] ($10/Month Amazon Gift Card Credit)",
    price: "$999",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQCHhNxgKsIoIfqSoZcpoBxxuoAb3YMr20EtTBQY-kmS7lzvgQWcn3da2x3lFlwYlKUngwaUQft&usqp=CAc",
    id: 1
  }],
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

class Nav extends Component {
  render() {
    return (
      <Route
        path="/"
        children={(routeProps) => {
          var isRenderButton = routeProps.location.pathname === '/' ? false : true
          return (
            <div className="nav">
              {
                isRenderButton ? (
                  <button className="goback">{"<"}</button>
                ) : ""
              }
              <p className="page-title">首页</p>
            </div>
          )
        }}>

      </Route>

    )
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav></Nav>
        </div>
      </Router>

    )
  }
}
export default App;
