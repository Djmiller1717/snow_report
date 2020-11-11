import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
// import { Marker } from 'react-mapbox-gl';
import { fetchedResorts } from '../redux/resorts';
// import resorts from '../../seed';

const resorts = [
  {
    resortName: 'Hunter Mountain',
    location: [-74.2246, 42.2029],
    state: 'New York',
  },
  {
    resortName: 'Wildcat Mountain',
    location: [-71.2393, 44.2641],
    state: 'New Hampshire',
  },
  {
    resortName: 'Mount Sunapee',
    location: [-72.0742, 43.3136],
    state: 'New Hampshire',
  },
  {
    resortName: 'Jack Frost / Big Boulder',
    location: [-75.6563, 41.1092],
    state: 'Pennsylvania',
  },
  {
    resortName: 'Whitetail Resort',
    location: [-77.9333, 39.7418],
    state: 'Pennsylvania',
  },
  {
    resortName: 'Roundtop Mountain Resort',
    location: [-76.9275, 40.1095],
    state: 'Pennsylvania',
  },
  {
    resortName: 'Attitash Mountain Resort',
    location: [-71.2294, 44.0828],
    state: 'New Hampshire',
  },
  {
    resortName: 'Crotched Mountain',
    location: [-71.8737, 42.9984],
    state: 'New Hampshire',
  },
  {
    resortName: 'Liberty Mountain Resort',
    location: [-77.3755, 39.7637],
    state: 'Pennsylvania',
  },
  {
    resortName: 'Okemo',
    location: [-72.7170, 43.4018],
    state: 'Vermont',
  },
  {
    resortName: 'Mount Snow',
    location: [-72.9204, 42.9602],
    state: 'Vermont',
  },
  {
    resortName: 'Stowe',
    location: [-72.6874, 44.4654],
    state: 'Vermont',
  },
];

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
    const { fetchedResorts } = this.props;
    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });

    // fetchedResorts();
    // console.log(resorts);
    // if (resorts.length) {
    map.on('load', () => {
      // let marker = new mapboxgl.Marker()
      //   .setLngLat([-74, 42.5])
      //   .addTo(map);
      resorts.forEach((resort) => {
        let marker = new mapboxgl.Marker()
          .setLngLat(resort.location)
          .addTo(map);
      //   console.log(marker);
      //   return marker;
      });
    });
    // }

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
    // const { resorts } = this.props;
    return (
      <div>
        <div className="sidebarStyle">
          <div>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>
        <div ref={el => this.mapContainer = el} className="mapContainer"></div>
        {/* <div>
          {resorts.map((resort) => {
            return (
              <Marker coordinates={resort.location} anchor="bottom">
                <h1>resort</h1>
              </Marker>
            );
          })}
        </div> */}
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
