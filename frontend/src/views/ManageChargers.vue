<template>
  <div class="container">
    <h2>🛠️ Manage Chargers</h2>

    <div class="form-card">
      <h3>Add New Charger</h3>
      <form @submit.prevent="addCharger" class="form">
        <input v-model="form.name" placeholder="Name" required />
        <input v-model="form.latitude" placeholder="Latitude" type="number" required />
        <input v-model="form.longitude" placeholder="Longitude" type="number" required />
        <select v-model="form.status" required>
          <option disabled value="">Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <input v-model="form.powerOutput" placeholder="Power Output (kW)" type="number" required />
        <input v-model="form.connectorType" placeholder="Connector Type" required />
        <button type="submit">Add Charger</button>
      </form>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div class="table-card">
      <h3>All Charging Stations</h3>
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
          <tr v-for="station in stations" :key="station.id">
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

export default {
  name: 'ManageChargersView',
  data() {
    return {
      stations: [],
      form: {
        name: '',
        latitude: '',
        longitude: '',
        status: '',
        powerOutput: '',
        connectorType: ''
      },
      error: ''
    };
  },
  async created() {
    this.fetchStations();
  },
  methods: {
    async fetchStations() {
      try {
        const res = await axios.get('/stations');
        this.stations = res.data;
      } catch (err) {
        this.error = 'Failed to load stations';
      }
    },
    async addCharger() {
      try {
        await axios.post('/stations', this.form);
        this.form = {
          name: '',
          latitude: '',
          longitude: '',
          status: '',
          powerOutput: '',
          connectorType: ''
        };
        this.fetchStations();
      } catch (err) {
        this.error = 'Failed to add charger';
      }
    }
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

.form-card,
.table-card {
  background: #fff;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

input,
select {
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  grid-column: span 3;
  padding: 0.7rem;
  font-size: 1rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #444;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
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

.error {
  color: red;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
