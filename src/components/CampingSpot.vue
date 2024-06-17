<template>
  <div class="camping-spot-container">
    <div class="header">
      <h1>Dreamy Trails</h1>
      <h2>Let's go Camping</h2>
    </div>
    <form @submit.prevent="filterCampingSpots">
      <div class="form-group">
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="filter.location" />
      </div>
      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="filter.startDate" />
      </div>
      <div class="form-group">
        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" v-model="filter.endDate" />
      </div>
      <div class="form-group">
        <label for="price">Price (max):</label>
        <input type="number" id="price" v-model="filter.price" />
      </div>
      <button type="submit">Search</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'CampingSpot',
  data() {
    return {
      filter: {
        location: '',
        startDate: '',
        endDate: '',
        price: 0,
      },
      campingSpots: [],
      selectedSpot: null,
      searchExecuted: false,
    };
  },
  methods: {
    async filterCampingSpots() {
      try {
        const params = new URLSearchParams();
        if (this.filter.location) params.append('location', this.filter.location);
        if (this.filter.startDate) params.append('startDate', this.filter.startDate);
        if (this.filter.endDate) params.append('endDate', this.filter.endDate);
        if (this.filter.price) params.append('price', this.filter.price);

        const response = await axios.get('http://localhost:5287/api/CampingSpots/search', { params });
        this.campingSpots = response.data;
        this.searchExecuted = true;
        this.selectedSpot = null; // Reset selected spot
      } catch (error) {
        console.error('Error fetching camping spots:', error);
      }
    },
    selectCampingSpot(spot) {
      this.selectedSpot = spot;
    },
    async bookCampingSpot(spot) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('token'));
        const bookingData = {
          userId: userInfo.id,
          campingSpotId: spot.id,
          bookingStartDate: this.filter.startDate,
          bookingEndDate: this.filter.endDate,
          totalPrice: this.calculateTotalPrice(spot.price, this.filter.startDate, this.filter.endDate)
        };

        const response = await axios.post('http://localhost:5287/api/Bookings', bookingData);
        console.log('Booking successful:', response.data); // Handle success as needed
        alert('Booking successful!'); // Temporary alert for demonstration
      } catch (error) {
        console.error('Error booking camping spot:', error);
        alert('Error booking camping spot. Please try again.'); // Temporary alert for demonstration
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    calculateTotalPrice(pricePerNight, startDate, endDate) {
      // Calculate number of nights
      const start = new Date(startDate);
      const end = new Date(endDate);
      const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
      const nights = Math.round(Math.abs((start - end) / oneDay));

      // Calculate total price
      return pricePerNight * nights;
    }
  }
};
</script>
<style scoped>
.camping-spot-container {
  background-image: url('/src/assets/campingBackground.jpg'); /* Replace with actual image URL */
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
}

.header {
  text-align: left;
  padding-left: 20px;
}

h1 {
  font-size: 1.5em;
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

h2 {
  font-size: 2.5em;
  color: olive;
  text-shadow: 2px 2px 4px #000000;
  margin-top: 0;
}

form {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, button {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: none;
  margin-bottom: 10px;
}

button {
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  font-size: 1em;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

li button {
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 8px;
  border: none;
  color: white;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

li button:hover {
  background: rgba(0, 0, 0, 0.7);
}

.spot-details {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.spot-details button {
  margin-top: 20px;
  background-color: #f44336;
}

.spot-details button:hover {
  background-color: #e53935;
}
</style>