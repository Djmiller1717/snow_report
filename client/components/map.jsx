import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import { fetchedResorts } from '../redux/resorts';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGptaWxsZXIxNzE3IiwiYSI6ImNrZHFvMHoyMzAwZGwycW54dXN1cTFveW8ifQ.UHW9oi2Z8NPas_liUEiAnw';
let map = {};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -75.5,
      lat: 42.26,
      zoom: 6,
      // map: {},
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const { fetchedResorts, resorts } = this.props;
    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });

    fetchedResorts();

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;
    const { resorts } = this.props;
    if (resorts.length) {
      map.on('load', () => {
        resorts.forEach((resort) => {
          const popup = new mapboxgl.Popup()
            .setHTML(`<div><h2>${resort.resortName}</h2></div>`);
          const marker = new mapboxgl.Marker()
            .setLngLat(resort.location)
            .setPopup(popup)
            .addTo(map);
        });
      });
    }
    return (
      <div>
        <div className="sidebarStyle">
          <div>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>
        <div ref={el => this.mapContainer = el} className="mapContainer"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resorts: state.resorts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchedResorts: () => dispatch(fetchedResorts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
