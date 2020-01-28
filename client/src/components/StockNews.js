import React, { Component } from "react";
import StockTable from "./StockTable";

import StockHistory from "./StockHistory";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import { Col, Row, Image, Container, Media } from "react-bootstrap";
import { refreshUserData } from "../actions/userActions";

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
    this.fetchNews();
  }

  fetchNews = async () => {
    try {
      const stockNews = await fetch(
        `https://cloud.iexapis.com/v1/stock/aapl/news/last/1?token=pk_764a7652cfde425785b349da624c23ac`,
        {
          mode: "cors"
        }
      ); //,{ mode: "cors" }
      const response = await stockNews.json();

      // temporarily show stock metrics so user can decide if they want to buy stock
      this.setState({
        stockNewsArray: response
      });
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
            <Row className="justify-content-center mb-4 mt-4">
              <h1>News</h1>
            </Row>
            {this.state.stockNewsArray.map(item => (
              <div>
                <Row className="pr-4 pl-4">
                  <Media>
                    <img
                      className="stock-news-image align-self-center"
                      src={item.image}
                      rounded
                    />
                    <Media.Body>
                      {item.source + " "} #{item.related}
                      <a
                        className="stock-news-article-title text-align-justify"
                        href={item.url}
                      >
                        {item.headline}
                      </a>
                    </Media.Body>
                  </Media>
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
