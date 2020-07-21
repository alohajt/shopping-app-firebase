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
    img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-white-select-2019?wid=834&hei=1000&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1566956148115",
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

class BottomBar extends Component {
  render() {
    return (
      <div className="bottom-bar">
        <Link className="bottom-bar-button" to="/">首页</Link>
        <Link className="bottom-bar-button" to="/shopping_car">购物车</Link>
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
              pageName = "首页"
              break
            case "/shopping_car":
              pageName = "购物车"
              break
            case "/list":
              pageName = "商品列表"
              break
            default:
              pageName = "No such page 404"
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
          <Link to="/list" className="index-item-link">去到列表</Link>
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

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav></Nav>
          <div className="App-main-view">
            <Route className="main-view" path="/" exact component={IndexView}></Route>
            <Route className="main-view" path="/list" exact component={ListView}></Route>

          </div>
          <Route path="/" exact component={BottomBar}></Route>
        </div>
      </Router>

    )
  }
}
export default App;
