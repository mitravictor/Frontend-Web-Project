<!-- UserInfo.vue -->
<template>
    <div class="user-info-container">
      <div class="user-info-box">
        <h1>User Info</h1>
        <div class="user-details">
          <div class="detail-item">
            <div class="detail-label">Name:</div>
            <div class="detail-value">{{ fullName }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Email:</div>
            <div class="detail-value">{{ userInfo.email }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Phone Number:</div>
            <div class="detail-value">{{ userInfo.phoneNumber }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userInfo: null
      };
    },
    created() {
      // Assume you have stored user information in localStorage upon login
      const userToken = localStorage.getItem('token');
      if (userToken) {
        const userData = JSON.parse(userToken);
        // Fetch user details from API based on user ID or use stored data
        this.userInfo = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber
        };
      }
    },
    computed: {
      fullName() {
        if (this.userInfo) {
          return `${this.userInfo.firstName} ${this.userInfo.lastName}`;
        }
        return '';
      }
    }
  };
  </script>
  
  <style scoped>
  .user-info-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
    background-color: #f0f0f0;
  }
  
  .user-info-box {
    max-width: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .user-details {
    display: flex;
    flex-direction: column;
  }
  
  .detail-item {
    display: flex;
    margin-bottom: 12px;
  }
  
  .detail-label {
    width: 120px;
    font-weight: bold;
    color: #555;
  }
  
  .detail-value {
    flex: 1;
    padding: 8px;
    background-color: #f9f9f9;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #333;
  }
  
  @media (max-width: 600px) {
    .user-info-box {
      width: 100%;
      margin: 0 10px;
    }
    
    .detail-label {
      width: 100px;
    }
  }
  </style>
  