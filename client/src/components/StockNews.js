import React, { Component } from "react";
import logo from "../assets/wsb_logo.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Row, Image, Container } from "react-bootstrap";

require("dotenv").config();
//test

var stockTickerList = [
  "AAPL",
  "GE",
  "MSFT",
  "DIS",
  "AMD",
  "SNAP",
  "FB",
  "TWTR",
  "AMZN",
  "UBER",
  "NFLX",
  "NVDA",
  "LYFT",
  "INTC",
  "WORK",
  "GOOGL",
  "TSLA"
];

function shuffleArray(array) {
  const a = array.slice();

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

class StockNews extends Component {
  state = {
    stockNewsArray: []
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object,
    register: PropTypes.func,
    clearErrors: PropTypes.func,
    isLoading: PropTypes.bool,
    user: PropTypes.object
  };

  componentDidMount() {
    var shuffledStocks = shuffleArray(stockTickerList).slice(0, 5);

    this.fetchNews(shuffledStocks);
  }

  fetchNews = async shuffledStocks => {
    try {
      for (let i = 0; i < shuffledStocks.length; i++) {
        var stockNews = await fetch(
          `https://cloud.iexapis.com/v1/stock/${shuffledStocks[i]}/news/last/1?token=${process.env.REACT_APP_IEX_TOKEN}`,
          {
            mode: "cors"
          }
        ); //,{ mode: "cors" }
        var response = await stockNews.json();
        console.log(response);
        var immutArray = this.state.stockNewsArray.concat(response);
        // temporarily show stock metrics so user can decide if they want to buy stock
        this.setState({
          stockNewsArray: immutArray
        });
      }
    } catch (error) {
      this.setState({
        stockNewsArray: [
          {
            datetime: "",
            headline: "No recent stock news found.",
            source: "",
            url: "",
            summary: "",
            related: "",
            image: "",
            lang: "",
            hasPaywall: ""
          }
        ]
      });
    }
  };

  render() {
    // this includes all the state values

    //const currentBalance = numeral(user.balance).format("$0,0.00");

    return (
      <Container>
        {this.state.stockNewsArray.length ? (
          <div>
            <Row className="justify-content-center mb-6 mt-4">
              <h1>News</h1>
            </Row>
            {this.state.stockNewsArray.map(item => (
              <div>
                <Row className="pr-4 pl-2 mt-4 mb-4 justify-content-md-center">
                  <Col className="no-spacing-news-col" xs={4} md={2}>
                    {item.image ? (
                      <Image
                        className="no-spacing-news-image stock-news-image align-self-center"
                        src={item.image}
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = logo;
                        }}
                        rounded
                        height={500}
                        width={500}
                      />
                    ) : (
                      <Image
                        className="no-spacing-news-image stock-news-image align-self-center"
                        src={logo}
                        rounded
                        height={500}
                        width={500}
                      ></Image>
                    )}
                  </Col>
                  <Col className="no-spacing-news-col-2">
                    <p className="no-spacing font-weight-bold">
                      {item.related}
                    </p>
                    <a
                      className="stock-news-article-title text-align-justify"
                      href={item.url}
                    >
                      {item.headline.replace(/^(.{70}[^\s]*).*/, "$1") + "..."}
                    </a>

                    <span className="font-italic">{" - " + item.source}</span>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        ) : (
          <h1>No Stock news found</h1>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error,
  isloading: state.auth.isLoading,
  user: state.user
});

export default connect(mapStateToProps)(StockNews);
