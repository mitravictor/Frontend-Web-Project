<template>
    <div class="user-profile-container">
      <h1>User Profile</h1>
      <div v-if="userProfile">
        <p><strong>Username:</strong> {{ userProfile.username }}</p>
        <p><strong>First Name:</strong> {{ userProfile.firstName }}</p>
        <p><strong>Last Name:</strong> {{ userProfile.lastName }}</p>
        <p><strong>Email:</strong> {{ userProfile.email }}</p>
        <p><strong>Phone Number:</strong> {{ userProfile.phoneNumber }}</p>
      </div>
      <div v-else>
        <p>Loading user profile...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserProfile',
    data() {
      return {
        userProfile: null
      };
    },
    created() {
      this.fetchUserProfile();
    },
    methods: {
      async fetchUserProfile() {
        try {
          // Replace with your backend API endpoint
          const username = 'vmit123'; // Example username, replace with actual login username
          const response = await axios.get(`http://localhost:5287/api/Users/${username}`);
          this.userProfile = response.data;
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
          // Handle error or show error message to user
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .user-profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .user-profile-container p {
    margin-bottom: 10px;
  }
  
  .user-profile-container strong {
    font-weight: bold;
  }
  </style>
  