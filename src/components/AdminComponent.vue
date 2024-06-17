<template>
    <div class="add-camping-spot-container">
      <div class="form-wrapper">
        <h1>Add a New Camping Spot</h1>
        <form @submit.prevent="addCampingSpot">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="campingSpot.name" required />
          </div>
          <div class="form-group">
            <label for="location">Location:</label>
            <input type="text" id="location" v-model="campingSpot.location" required />
          </div>
          <div class="form-group">
            <label for="availableFrom">Available From:</label>
            <input type="datetime-local" id="availableFrom" v-model="campingSpot.availableFrom" required />
          </div>
          <div class="form-group">
            <label for="availableUntil">Available Until:</label>
            <input type="datetime-local" id="availableUntil" v-model="campingSpot.availableUntil" required />
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <input type="number" id="price" v-model="campingSpot.price" required />
          </div>
          <div class="form-group">
            <label for="maxOccupancy">Max Occupancy:</label>
            <input type="number" id="maxOccupancy" v-model="campingSpot.maxOccupancy" required />
          </div>
          <div class="form-group">
            <label for="comment">Comment:</label>
            <textarea id="comment" v-model="campingSpot.comment"></textarea>
          </div>
          <div class="form-group">
            <label for="amenities">Amenities (comma-separated):</label>
            <input type="text" id="amenities" v-model="amenitiesInput" />
          </div>
          <button type="submit">Add Camping Spot</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AddCampingSpot',
    data() {
      return {
        campingSpot: {
          id: 0,
          name: '',
          location: '',
          availableFrom: '',
          availableUntil: '',
          price: 0,
          maxOccupancy: 0,
          comment: '',
          amenities: []
        },
        amenitiesInput: ''
      };
    },
    methods: {
      async addCampingSpot() {
        try {
          // Split amenitiesInput by comma and trim whitespace
          this.campingSpot.amenities = this.amenitiesInput.split(',').map(amenity => amenity.trim());
  
          const response = await axios.post('http://localhost:5287/api/CampingSpots', this.campingSpot);
          console.log('Camping spot added:', response.data);
          alert('Camping spot added successfully!');
          
          // Optionally, reset form or redirect
          this.resetForm();
        } catch (error) {
          console.error('Error adding camping spot:', error);
          alert('Error adding camping spot. Please try again.');
        }
      },
      resetForm() {
        this.campingSpot = {
          id: 0,
          name: '',
          location: '',
          availableFrom: '',
          availableUntil: '',
          price: 0,
          maxOccupancy: 0,
          comment: '',
          amenities: []
        };
        this.amenitiesInput = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .add-camping-spot-container {
    background-image: url('/src/assets/AdminPageBackground.jpg');
    background-size: cover;
    background-position: center;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(8px);
  }
  
  .form-wrapper {
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    width: 100%;
  }
  
  h1 {
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    color: #333; /* Adjust text color for contrast */
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    margin-bottom: 5px;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: white;
    color: #333; /* Adjust text color for contrast */
  }
  
  textarea {
    resize: vertical;
    height: 100px;
  }
  
  button {
    padding: 10px;
    border-radius: 4px;
    border: none;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    font-size: 1em;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  