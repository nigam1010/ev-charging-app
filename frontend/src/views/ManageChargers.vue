<template>
  <div class="container">
    <h2>🛠️ Manage Chargers</h2>

    <div class="form-card">
      <h3>{{ editMode ? 'Edit Charger' : 'Add New Charger' }}</h3>
      <form @submit.prevent="editMode ? updateCharger() : addCharger()" class="form">
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
        <button type="submit">{{ editMode ? 'Update' : 'Add' }} Charger</button>
        <button v-if="editMode" type="button" @click="cancelEdit" class="cancel-btn">Cancel</button>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="station in stations" :key="station.id">
            <td>{{ station.name }}</td>
            <td>{{ station.latitude }}, {{ station.longitude }}</td>
            <td>{{ station.status }}</td>
            <td>{{ station.powerOutput }} kW</td>
            <td>{{ station.connectorType }}</td>
            <td>
              <button @click="editStation(station)">✏️ Edit</button>
              <button @click="deleteStation(station.id)" class="danger">🗑️ Delete</button>
            </td>
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
      editingId: null,
      error: ''
    };
  },
  computed: {
    editMode() {
      return this.editingId !== null;
    }
  },
  created() {
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
        this.resetForm();
        this.fetchStations();
      } catch (err) {
        this.error = 'Failed to add charger';
      }
    },
    editStation(station) {
      this.form = { ...station };
      this.editingId = station.id;
    },
    async updateCharger() {
      try {
        await axios.put(`/stations/${this.editingId}`, this.form);
        this.resetForm();
        this.fetchStations();
      } catch (err) {
        this.error = 'Failed to update charger';
      }
    },
    async deleteStation(id) {
      if (confirm('Are you sure you want to delete this charger?')) {
        try {
          await axios.delete(`/stations/${id}`);
          this.fetchStations();
        } catch (err) {
          this.error = 'Failed to delete charger';
        }
      }
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: '',
        latitude: '',
        longitude: '',
        status: '',
        powerOutput: '',
        connectorType: ''
      };
      this.editingId = null;
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

button.danger {
  background-color: #e74c3c;
  margin-left: 5px;
}

button.danger:hover {
  background-color: #c0392b;
}

button.cancel-btn {
  background-color: #999;
  margin-left: 5px;
}

button.cancel-btn:hover {
  background-color: #777;
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
