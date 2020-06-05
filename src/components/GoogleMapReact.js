import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faPlus,
  faTimes,
  faExclamation,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import Sidebar from './Sidebar';
import CountriesPolygons from './countriesPolygons.json';
import MapStyle from './googleMapReactStyle.json';

const MapDataNr = ({
  text, bgColor, color, menuDisplayed,
}) => {
  if (text !== 0 && menuDisplayed === 'wrapper') {
    return (
      <div
        className="nrCircle"
        style={{
          backgroundImage: `radial-gradient(${bgColor} 40%, transparent)`,
          color,
        }}
      >
        <p>{text}</p>
      </div>
    );
  } return '';
};

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: 'confirmed',
      countryData: [],
      menuDisplayed: 'wrapper',
    };

    this.showSidebar = this.showSidebar.bind(this);
    this.buttons = this.buttons.bind(this);
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
  }

  onGoogleApiLoaded(map, maps) {
    const polygonStyle = { ...this.props.countryPolygonStyle };
    CountriesPolygons.map((countryMap) => {
      return countryMap.coordinates.map((countryCoordinates) => {
        const countryPolygon = new maps.Polygon({
          paths: countryCoordinates,
          ...polygonStyle,
          fillOpacity: 0.05,
        });
        maps.event.addListener(countryPolygon, 'mouseover', function addListenerMouseOver() {
          this.setOptions({
            paths: countryCoordinates,
            ...polygonStyle,
            fillOpacity: 0.5,
          });
        });
        maps.event.addListener(countryPolygon, 'mouseout', function addListenerMouseOut() {
          this.setOptions({
            paths: countryCoordinates,
            ...polygonStyle,
            fillOpacity: 0.05,
          });
        });
        maps.event.addListener(countryPolygon, 'click', () => { return this.showSidebar(countryMap.name); });
        const countryData = this.props.allCountries.filter((country) => {
          return country.country === countryMap.name;
        });
        maps.event.addListener(countryPolygon, 'click', function addListenerClick() {
          if (countryData.length !== 0) {
            map.setCenter({
              lat: countryData[0].latitude,
              lng: countryData[0].longitude,
            });
          }
          this.setOptions({
            paths: countryCoordinates,
            strokeColor: '#435158',
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: '#dc3545',
            fillOpacity: 0.2,
          });
        });
        return countryPolygon.setMap(map);
      });
    });
  }

  showSidebar(name) {
    const countryData = this.props.allCountries.filter((country) => {
      return country.country === name;
    });
    this.setState({
      countryData: countryData[0],
      menuDisplayed: 'wrapper menuDisplayed',
    });
  }

  buttons() {
    if (this.state.menuDisplayed === 'wrapper') {
      return (
        <div className="dataButtons">
          <button
            data-tip="CONFIRMED"
            className="btn btn-warning btn-circle btn-xl"
            onClick={() => { return this.setState({ dataType: 'confirmed' }); }}
            type="button"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            data-tip="RECOVERED"
            className="btn btn-success btn-circle btn-xl"
            onClick={() => { return this.setState({ dataType: 'recovered' }); }}
            type="button"
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            data-tip="CRITICAL"
            className="btn btn-danger btn-circle btn-xl"
            onClick={() => { return this.setState({ dataType: 'critical' }); }}
            type="button"
          >
            <FontAwesomeIcon icon={faExclamation} />
          </button>
          <button
            data-tip="DEATHS"
            type="button"
            className="btn btn-secondary btn-circle btn-xl"
            onClick={() => { return this.setState({ dataType: 'deaths' }); }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      );
    }
    return (
      <div className="dataButtons allCountries">
        <button
          data-tip="ALL COUNTRIES"
          type="button"
          className="btn btn-info btn-circle btn-xl"
          onClick={() => { return this.setState({ menuDisplayed: 'wrapper' }); }}
        >
          <FontAwesomeIcon icon={faGlobe} />
        </button>
      </div>
    );
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <ReactTooltip effect="solid" />
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_API_KEY }}
          defaultCenter={this.props.center}
          options={this.props.mapOptions}
          defaultZoom={this.props.zoom}
          onReady={this.autoCenterMap}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => { return this.onGoogleApiLoaded(map, maps); }}
        >
          {this.props.allCountries.map((country) => {
            return (
              <MapDataNr
                key={country.country}
                lat={country.latitude}
                lng={country.longitude}
                text={country[this.state.dataType]}
                bgColor={this.props.color[this.state.dataType]}
                menuDisplayed={this.state.menuDisplayed}
                color={
                    this.state.dataType === 'confirmed' ? '#212529' : '#FFF'
                  }
              />
            );
          })}
        </GoogleMapReact>
        {<Sidebar
          countryData={this.state.countryData}
          menuDisplayed={this.state.menuDisplayed}
        />}
        {this.buttons()}
      </div>
    );
  }
}

SimpleMap.defaultProps = {
  center: {
    lat: 24.8109849,
    lng: 15.5959094,
  },
  zoom: 3,
  color: {
    critical: '#dc3545',
    recovered: '#28a745',
    confirmed: '#ffc107',
    deaths: '#6c757d',
  },
  mapOptions: {
    styles: MapStyle,
    minZoom: 3,
    maxZoom: 8,
  },
  countryPolygonStyle: {
    strokeColor: '#435158',
    strokeOpacity: 0.5,
    strokeWeight: 1,
    fillColor: '#1d475c',
  },
};

export default SimpleMap;
