<template>
  <div class="dashboard">
        <!-- OUTER wrapper controls margin on page -->
    <div class="hero-wrapper">
      <div class="hero">
        <img src="@/assets/ev-banner.jpg" alt="EV Charging" />
        <div class="hero-text">
          <h1>Smart EV Charging Dashboard</h1>
          <p>Reliable, scalable, and efficient station monitoring</p>
        </div>
      </div>
    </div>

    <!-- Overview Info -->
    <section class="info-section">
      <h2>EV Charging Features</h2>
      <ul>
        <li>✔️ Real-time charging station monitoring</li>
        <li>✔️ Add / edit / view charger locations</li>
        <li>✔️ Interactive map & filters</li>
        <li>✔️ Easy-to-use web interface</li>
      </ul>
    </section>

    <!-- Navigation Cards -->
    <div class="card-container">
      <div class="card" @click="$router.push('/manage')">
        <h2>🛠️ Manage Chargers</h2>
        <p>Add, edit, or delete stations</p>
      </div>
      <div class="card" @click="$router.push('/chargers')">
        <h2>📍 View Chargers</h2>
        <p>Filter, map and analyze stations</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainDashboard'
}
</script>

<style scoped>
body {
  overflow-x: hidden; /* 💡 disables accidental scroll */
}

.dashboard {
  text-align: center;
  padding: 1rem 3rem 1rem;
  max-width: 1100px;
  margin: auto;
}

/* Hero Section */
.hero-wrapper {
  padding: 0 5vw; /* ✅ 5% space from both ends */
}

.hero {
  position: relative;
  right: 25%;
  width: 150%;
  align-items: center;
  margin: auto;       
  height: 190px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 0 2px 6px rgba(0,0,0,0.6);
}


/* Info Section */
.info-section {
  margin: 2rem auto;
  text-align: center;
}
.info-section h2 {
  margin-bottom: 1rem;
}
.info-section ul {
  list-style: none;
  padding: 0;
}
.info-section li {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

/* Cards */
.card-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}
.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  width: 250px;
  transition: 0.3s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
</style>
