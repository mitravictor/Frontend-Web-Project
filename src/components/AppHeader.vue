<template>
    <header class="appHeader">
      <div class="logoContainer">
        <img src="@/assets/AppLogo.png" alt="Dreamy Trails Logo" class="appLogo" />
        <span class="appName">Dreamy Trails</span>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'AppHeader'
  };
  </script>
  
  <style scoped>
  .appHeader {
    background-color: #4CAF50; /* Adjust background color as needed */
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logoContainer {
    display: flex;
    align-items: center;
  }
  
  .appLogo {
    width: 40px; /* Adjust logo size as needed */
    height: 40px;
    margin-right: 10px;
  }
  
  .appName {
    font-size: 1.2em; /* Adjust font size as needed */
    font-weight: bold;
    text-transform: uppercase;
  }
  </style>
  