import React, { Fragment } from "react";

const Child = (prop) => {
  console.log(prop, "aaa");
  return (
    <Fragment>
      <div>{`${prop.title}`} Child</div>
      <button onClick={() => prop.handler("Hi from child")}></button>
    </Fragment>
  );
};
export default Child;
