import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
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
    };
    this.seeWeather = this.seeWeather.bind(this);
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const { fetchedResorts } = this.props;
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

  seeWeather(resortName) {
    let { history } = this.props;
    history.push({
      pathname: `/${resortName}`,
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;
    const { resorts, history } = this.props;
    if (resorts.length) {
      map.on('load', () => {
        resorts.forEach((resort) => {
          const innerHtmlContent = `<div style="min-width: 600px;font-size: large;color : black;">
            <h4 class="h4Class">${resort.resortName} </h4> </div>`;
          const divElement = document.createElement('div');
          const assignBtn = document.createElement('div');
          assignBtn.innerHTML = '<button class="btn">Weather Details</button>';
          divElement.innerHTML = innerHtmlContent;
          divElement.appendChild(assignBtn);
          assignBtn.addEventListener('click', (e) => {
            this.seeWeather(resort.resortName);
          });
          const popup = new mapboxgl.Popup({
            offset: 25,
          })
            .setDOMContent(divElement);
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
          <div>Snow Report</div>
          <div>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
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
