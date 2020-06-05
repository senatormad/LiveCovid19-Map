import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCountries } from '../redux/ActionCreators';
import GoogleMapReact from './GoogleMapReact';


const mapStateToProps = (state) => {
  return {
    allCountries: state.allCountries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCountries: () => { dispatch(fetchAllCountries()); },
  };
};


class Main extends Component {
  componentDidMount() {
    this.props.fetchAllCountries();
  }


  render() {
    return (
      <div>
        <GoogleMapReact allCountries={this.props.allCountries.allCountries} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
