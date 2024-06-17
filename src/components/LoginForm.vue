<template>
  <div class="login-container">
    <h1 class="app-name">Dreamy Trails</h1>
    <div class="login-box">
      <h2>Welcome back!</h2>
      <form @submit.prevent="checkUser" class="login-form">
        <div class="alert-box" v-if="showAlert" :class="alertType">
          <p>{{ alertMessage }}</p>
        </div>
        <div class="form-group">
          <input
            type="text"
            id="username"
            v-model="loginData.username"
            required
            class="form-control"
            placeholder="Username or Email"
          />
        </div>
        <div style="margin-bottom: 10px;"></div>
        <div class="form-group">
          <input
            type="password"
            id="password"
            v-model="loginData.passwordHash"
            required
            class="form-control"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-login">Log In</button>
      </form>
      <p class="signup-link">Don't have an account? <router-link to="/SignUp">Sign up</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginData: {
        username: '',
        passwordHash: ''
      },
      showAlert: false,
      alertMessage: '',
      alertType: ''
    };
  },
  methods: {
    async checkUser() {
      this.showAlert = false;
      try {
        const response = await axios.get('http://localhost:5287/api/Users');
        const users = response.data;
        const user = users.find(
          u =>
            (u.username === this.loginData.username || u.email === this.loginData.username) &&
            u.passwordHash === this.loginData.passwordHash
        );

        if (user) {
          this.showAlert = true;
          this.alertMessage = 'Login successful';
          this.alertType = 'success';
          const userToken = JSON.stringify(user);
          localStorage.setItem('token', userToken);
          setTimeout(() => {
            this.$router.push('/dashboard');
          }, 2000);
        } else {
          this.showAlert = true;
          this.alertMessage = 'Login failed. Please check your username and password.';
          this.alertType = 'error';
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        this.showAlert = true;
        this.alertMessage = 'Login failed. Please try again later.';
        this.alertType = 'error';
      }
    }
  }
};
</script>

<style scoped>
/* Container Styles */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('../assets/campingBackground.jpg');
  background-size: cover;
}

/* Application Name Styles */
.app-name {
  font-size: 36px;
  color: #fff;
  margin-bottom: 40px;
  transition: color 0.3s;
}
.app-name:hover {
  color: #ffcc00;
}
.app-name:active {
  transform: scale(0.95);
}

/* Login Box Styles */
.login-box {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
}

/* Log In Button Styles */
.btn-login {
  width: 100%;
  font-size: 18px;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}
.btn-login:hover {
  background-color: #45a049;
}
.btn-login:active {
  transform: scale(0.95);
}

/* Signup Link Styles */
.signup-link {
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
}
.signup-link a {
  color: #007bff;
  text-decoration: none;
}
.signup-link a:hover {
  color: #0056b3;
}

/* Alert Box Styles */
.alert-box {
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
}

.alert-box p {
  margin: 0;
}

.alert-box.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert-box.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
</style>
