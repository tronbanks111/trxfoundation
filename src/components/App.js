import React, { Component } from "react";

import Top from "./TopPage2"; // toppage2
import { Route, BrowserRouter } from "react-router-dom";

import Footer from "./Footer";
import Param from "./Param";

import "./css/font-awesome-all.css";
import "./css/flaticon.css";
import "./css/bootstrap.css";
import "./css/jquery.fancybox.min.css";
import "./css/animate.css";
import "./css/imagebg.css";
import "./css/style.css";
import "./css/responsive.css";

// let refLinkAddress;
// const Child = ({ match }) => (refLinkAddress = match.params.id);

class App extends React.Component {

  render() {
    return (
      <div>

        <div>
          <BrowserRouter>
            <Route exact path='/' component={Top} />
            <Route path='/:id' component={Param} />
          </BrowserRouter>
        </div>

      </div>
    );
  }
}

export default App;
