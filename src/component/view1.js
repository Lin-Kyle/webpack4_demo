import React, { Fragment } from "react";

export default () => {
  return (
    <Fragment>
      <p>Page1</p>
      <img className="img1" src={require("../img/1.jpg")} alt="" />
    </Fragment>
  );
};