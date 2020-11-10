import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGptaWxsZXIxNzE3IiwiYSI6ImNrZHFvMHoyMzAwZGwycW54dXN1cTFveW8ifQ.UHW9oi2Z8NPas_liUEiAnw';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -74,
      lat: 42.5,
      zoom: 6,
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });

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
    return (
      <div>
        <div className="sidebarStyle">
          <div>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>
        <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
