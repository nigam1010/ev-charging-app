<template>
  <div class="container">
    <h2>📍 Charging Stations</h2>

    <div class="filters">
      <select v-model="filter.status">
        <option value="">All Statuses</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
      <select v-model="filter.connectorType">
        <option value="">All Connectors</option>
        <option>Type1</option>
        <option>Type2</option>
        <option>Type D</option>
        <option>CCS</option>
        <option>CHAdeMO</option>
      </select>
    </div>

    <div class="map-container">
      <div id="map"></div>
    </div>

    <div class="table-card">
      <h3>Charger Details</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Power Output</th>
            <th>Connector Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="station in filteredStations" :key="station.id">
            <td>{{ station.name }}</td>
            <td>{{ station.latitude }}, {{ station.longitude }}</td>
            <td>{{ station.status }}</td>
            <td>{{ station.powerOutput }} kW</td>
            <td>{{ station.connectorType }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default {
  name: 'ChargerMapView',
  data() {
    return {
      map: null,
      stations: [],
      markers: [],
      filter: {
        status: '',
        connectorType: ''
      },
      error: ''
    };
  },
  computed: {
    filteredStations() {
      return this.stations.filter(s => {
        return (!this.filter.status || s.status === this.filter.status) &&
               (!this.filter.connectorType || s.connectorType === this.filter.connectorType);
      });
    }
  },
  watch: {
    filteredStations() {
      this.renderMarkers();
    }
  },
  methods: {
    async fetchStations() {
      try {
        const res = await axios.get('/stations');
        this.stations = res.data;
        this.initMap();
        this.renderMarkers();
      } catch (err) {
        this.error = 'Failed to load stations';
      }
    },
    initMap() {
      if (this.map) return;
      this.map = L.map('map').setView([20.5937, 78.9629], 5); // India center
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    },
    renderMarkers() {
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.markers = [];

      this.filteredStations.forEach(station => {
        const marker = L.marker([station.latitude, station.longitude])
          .bindPopup(`<b>${station.name}</b><br>Status: ${station.status}`)
          .addTo(this.map);
        this.markers.push(marker);
      });
    }
  },
  mounted() {
    this.fetchStations();
  }
};
</script>

<style scoped>
.container {
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
}
h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}
.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
select {
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.map-container {
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
}
#map {
  height: 100%;
  width: 100%;
}
.table-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: center;
}
th {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #f9f9f9;
}
</style>
