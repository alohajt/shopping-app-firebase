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
    name: "",
    price: "",
    img: "",
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
      this / this.list.filter(e => e.id === id)[0]
    )
  },
  //将某个商品添加购物车
  add: function (id, callback) {
    this.shoppingCar.push(
      this.list.filter(e => e.id === id)[0]
    )
    callback({ code: 200, msg: "successfully added!" })
  },
  //获取全部购物车的商品
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
          var isRenderButton = routeProps.location.pathname === '/' ? true : false
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
        }}

      >

      </Route>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          
        </div>
      </Router>
      
    )
  }
}
export default App;
