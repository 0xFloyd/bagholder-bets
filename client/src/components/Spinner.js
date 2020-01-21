import React from "react";
import { css } from "@emotion/core";
// First way to import
import { MoonLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <MoonLoader
        css={override}
        size={50}
        color={"green"}
        //size={"150px"} this also works
      />
    );
  }
}

export default Spinner;
