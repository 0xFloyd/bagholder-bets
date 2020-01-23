import React, { Component } from "react";
import { PieChart, Pie, Sector, Cell, Tooltip, Label } from "recharts";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "rgb(33, 206, 153)"];

function randomColor() {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var color = "rgb(" + x + "," + y + "," + z + ")";
  return color;
}

const renderActiveShape = props => {
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
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

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
        fill={fill}
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
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class StockChart extends Component {
  state = {
    activeIndex: 0
  };

  static propTypes = {
    stock: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object,
    user: PropTypes.object
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
            data={newArray}
            innerRadius={40}
            outerRadius={80}
            fill="rgb(33, 206, 153)"
          >
            {newArray.map((entry, index) => (
              <Cell fill={randomColor()}></Cell>
            ))}
          </Pie>
          <Tooltip />
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

export default connect(mapStateToProps)(StockChart);
