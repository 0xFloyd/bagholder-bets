import React, { Component } from "react";
import { PieChart, Pie, Sector } from "recharts";

import { connect } from "react-redux";
import PropTypes from "prop-types";

function randomColor() {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var color = "rgb(" + x + "," + y + "," + z + ")";
  return color;
}

class TwoLevelPieChart extends Component {
  state = {
    activeIndex: 0
  };

  static propTypes = {
    stock: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object,
    user: PropTypes.object
  };

  renderActiveShape = props => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={randomColor()}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />

        <text x={235} y={30} fill="rgb(33, 206, 153)">
          {`${payload.name}: ${payload.value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })}`}
        </text>
      </g>
    );
  };

  getInitialState = () => {
    return {
      activeIndex: 0
    };
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    var { stocks } = this.props.stock;
    const { user } = this.props.user;

    var newArray = stocks.map(stock => {
      return { name: stock.ticker, value: Number(stock.value) };
    });
    if (user) {
      newArray.push({ name: "cash", value: user.balance });
    }
    return (
      <div>
        <PieChart width={600} height={300}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={this.renderActiveShape}
            data={newArray}
            innerRadius={50}
            outerRadius={80}
            fill="rgb(33, 206, 153)"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps)(TwoLevelPieChart);
