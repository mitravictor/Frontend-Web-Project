<!-- UserBookings.vue -->
<template>
    <div class="user-bookings">
      <app-header />
      <h1>My Bookings</h1>
      <ul v-if="bookings.length">
        <li v-for="booking in bookings" :key="booking.id">
          <p><strong>Booking ID:</strong> {{ booking.id }}</p>
          <p><strong>Camping Spot Name:</strong> {{ getCampingSpotName(booking.campingSpotId) }}</p>
          <p><strong>Start Date:</strong> {{ formatDate(booking.bookingStartDate) }}</p>
          <p><strong>End Date:</strong> {{ formatDate(booking.bookingEndDate) }}</p>
          <p><strong>Total Price:</strong> ${{ booking.totalPrice }}</p>
        </li>
      </ul>
      <p v-else>No bookings found.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AppHeader from './AppHeader.vue';
  
  export default {
    name: 'UserBookings',
    components: {
      AppHeader,
    },
    data() {
      return {
        bookings: [],
        userId: null,
        campingSpots: [],
      };
    },
    async created() {
      await this.fetchCampingSpots();
      await this.fetchBookings();
    },
    methods: {
      async fetchCampingSpots() {
        try {
          const response = await axios.get('http://localhost:5287/api/CampingSpots');
          this.campingSpots = response.data;
        } catch (error) {
          console.error('Error fetching camping spots:', error);
        }
      },
      async fetchBookings() {
        try {
          const userInfo = JSON.parse(localStorage.getItem('token'));
          if (!userInfo || !userInfo.id) {
            throw new Error('Invalid user information');
          }
          this.userId = userInfo.id;
  
          const response = await axios.get(`http://localhost:5287/api/Bookings`);
          this.bookings = response.data.filter(booking => booking.userId === this.userId);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      },
      getCampingSpotName(campingSpotId) {
        const spot = this.campingSpots.find(spot => spot.id === campingSpotId);
        return spot ? spot.name : 'Unknown';
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      }
    }
  };
  </script>
  
  <style scoped>
  .user-bookings {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    background: white;
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  p {
    margin: 0;
    line-height: 1.5;
  }
  </style>
  