import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { hot } from "react-hot-loader";
import View1 from "CMT/view1";
import View2 from "CMT/view2";
import "STYLE/style.scss";
class Main extends Component {
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

export default hot(module)(Main);
