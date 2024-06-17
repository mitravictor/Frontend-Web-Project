<template>
    <div class="dashboard-container">
      <AppHeader />
      <button @click="logout" class="logout-button">Logout</button>
  
      <!-- Main content section -->
      <div class="main-content">
        <h1>Welcome, {{ userFullName }}!</h1>
        <p class="description-text">
          Explore beautiful camping spots, manage your bookings, or access the admin panel.
        </p>
  
        <!-- Button group -->
        <div class="button-group">
          <router-link to="/CampingSpot" class="dashboard-item explore-camping">
            <span class="text">Explore Camping Spots</span>
          </router-link>
          <router-link to="/UserBookings" class="dashboard-item user-bookings">
            <span class="text">My Bookings</span>
          </router-link>
          <router-link to="/admin" class="dashboard-item admin-panel">
            <span class="text">Admin Panel</span>
          </router-link>
          <router-link to="/UserInfo" class="dashboard-item user-info">
            <span class="text">User Info</span>
          </router-link>
        </div>
      </div>
  
      <!-- Contact Us section -->
      <div class="contact-us">
        <h2>Contact Us</h2>
        <p class="contact-info">
          If you have any questions or need assistance, feel free to reach out to us:
          <span>Email:</span> <a href="mailto:info@dreamytrails.com">info@dreamytrails.com</a> |
          <span>Phone:</span> +1 (123) 456-7890
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AppHeader from '@/components/AppHeader.vue';
  
  export default {
    name: 'DashBoard',
    components: {
      AppHeader
    },
    data() {
      return {
        userFullName: '',
      };
    },
    async created() {
      try {
        const userInfo = JSON.parse(localStorage.getItem('token'));
        if (userInfo) {
          const response = await axios.get(`http://localhost:5287/api/Users/${userInfo.id}`);
          const user = response.data;
          this.userFullName = `${user.firstName} ${user.lastName}`;
        } else {
          this.$router.push('/'); // Redirect to login if no user info found
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        this.$router.push('/'); // Redirect to login on error
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    background-color: #e0f2f1; /* Light blue background color */
    padding: 20px;
    font-family: Arial, sans-serif;
    min-height: 100vh; /* Ensure the container fills the viewport */
    text-align: center; /* Center align text within the container */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .logout-button {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    font-size: 1em;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: opacity 0.3s;
  }
  
  .logout-button:hover {
    opacity: 0.8;
  }
  
  .main-content {
    flex: 1; /* Take remaining space */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px; /* Space between main content and Contact Us */
  }
  
  .page-description {
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  .description-text {
    font-size: 1.2em;
    color: #333;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    max-width: 800px;
  }
  
  .dashboard-item {
    flex: 1 1 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    font-size: 1.2em;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: transform 0.3s, opacity 0.3s;
  }
  
  .dashboard-item:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
  
  .dashboard-item .text {
    position: relative;
    z-index: 1;
  }
  
  .explore-camping {
    background-image: url('../assets/exploreCamping.jpg');
    background-size: cover;
    background-position: center;
  }
  
  .user-bookings {
    background-image: url('../assets/UserBookingsBackground.jpg');
    background-size: cover;
    background-position: center;
  }
  
  .admin-panel {
    background-image: url('../assets/AdminPageBackground.jpg');
    background-size: cover;
    background-position: center;
  }
  
  .user-info {
    background-image: url('../assets/campingBackground.jpg');
    background-size: cover;
    background-position: center;
  }
  
  .dashboard-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Overlay color for image */
    z-index: 0;
  }
  
  .text {
    position: relative;
    z-index: 1;
  }
  
  .router-link-active .dashboard-item::before {
    background-color: rgba(0, 0, 0, 0.7); /* Darker overlay color when active */
  }
  
  .contact-us {
    background-color: #ffffff; /* White background for Contact Us section */
    padding: 20px;
    width: 100%;
    max-width: 800px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
    text-align: center;
    margin-top: 40px;
  }
  
  .contact-us h2 {
    font-size: 1.8em;
    margin-bottom: 10px;
    color: #333; /* Dark text color */
  }
  
  .contact-us p {
    font-size: 1.2em;
    color: #666; /* Medium gray text color */
    margin-bottom: 20px;
    line-height: 1.6; /* Increased line height for better readability */
  }
  
  .contact-us ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .contact-us li {
    font-size: 1.2em;
    color: #333; /* Dark text color */
    margin-bottom: 10px;
  }
  
  .contact-us a {
    color: #007bff; /* Blue link color */
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .contact-us a:hover {
    color: #0056b3; /* Darker blue on hover */
  }
  </style>
  