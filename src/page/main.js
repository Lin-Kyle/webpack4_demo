import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import View1 from "../component/view1";
import View2 from "../component/view2";
import "../style/style.scss";

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: "Hello World!"
    };
  }

  render() {
    return (
      <Fragment>
        <p>{this.state.title}</p>
        <Link to="/view1/">View1</Link>
        <Link to="/view2/">View2</Link>
        <Switch>
          <Route exact path="/" component={View1} />
          <Route path="/view1/" component={View1} />
          <Route path="/view2/" component={View2} />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    );
  }
}
