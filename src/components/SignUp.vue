<template>
  <div class="signup-container">
    <h1>Create an Account</h1>
    <form @submit.prevent="signup" class="signup-form">
      <div class="alert-box" v-if="showAlert" :class="alertType">
        <p>{{ alertMessage }}</p>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" v-model="signupData.username" id="username" required placeholder="Username" @blur="checkUsername" />
        <span v-if="usernameCheck.loading">Checking username...</span>
      </div>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" v-model="signupData.firstName" id="firstName" required placeholder="First Name" />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" v-model="signupData.lastName" id="lastName" required placeholder="Last Name" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="signupData.email" id="email" required placeholder="Email" />
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input type="text" v-model="signupData.phoneNumber" id="phoneNumber" required placeholder="Phone Number" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="signupData.passwordHash" id="password" required placeholder="Password" />
      </div>
      <button type="submit" class="btn btn-signup" :disabled="!formValid">Sign Up</button>
      <router-link to="/" class="btn btn-back">Back to Login Page</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      signupData: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        passwordHash: '',
      },
      usernameCheck: {
        available: true,
        loading: false
      },
      showAlert: false,
      alertMessage: '',
      alertType: ''
    };
  },
  computed: {
    formValid() {
      return (
        this.signupData.username &&
        this.signupData.firstName &&
        this.signupData.lastName &&
        this.signupData.email &&
        this.signupData.phoneNumber &&
        this.signupData.passwordHash &&
        this.usernameCheck.available
      );
    }
  },
  methods: {
    async checkUsername() {
      this.usernameCheck.loading = true;
      this.showAlert = false;
      try {
        const response = await axios.get('http://localhost:5287/api/Users/check-username', {
          params: { username: this.signupData.username }
        });
        this.usernameCheck.available = response.data.isAvailable;
        if (!this.usernameCheck.available) {
          this.showAlert = true;
          this.alertMessage = 'Username is already taken. Please choose another one.';
          this.alertType = 'error';
        }
      } catch (error) {
        console.error('Error checking username availability:', error.response ? error.response.data : error.message);
        this.showAlert = true;
        this.alertMessage = 'Error checking username availability. Please try again.';
        this.alertType = 'error';
      } finally {
        this.usernameCheck.loading = false;
      }
    },
    async signup() {
      if (!this.usernameCheck.available) {
        this.showAlert = true;
        this.alertMessage = 'Username is already taken. Please choose another one.';
        this.alertType = 'error';
        return;
      }

      if (!this.formValid) {
        this.showAlert = true;
        this.alertMessage = 'Please fill in all the required fields.';
        this.alertType = 'error';
        return;
      }

      try {
        const response = await axios.post('http://localhost:5287/api/Users', this.signupData);
        console.log('Signup successful:', response.data);
        this.showAlert = true;
        this.alertMessage = 'Signup successful! Please log in.';
        this.alertType = 'success';
        setTimeout(() => {
          this.$router.push('/');
        }, 2000);
      } catch (error) {
        console.error('Signup failed:', error.response ? error.response.data : error.message);
        this.showAlert = true;
        this.alertMessage = 'Signup failed. Please check your input and try again.';
        this.alertType = 'error';
      }
    }
  }
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.signup-container h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.signup-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group input:focus {
  border-color: #4CAF50;
  outline: none;
}

.btn {
  display: block;
  text-align: center;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  text-decoration: none;
  margin-top: 15px;
}

.btn-signup:hover,
.btn-back:hover {
  background-color: #45a049;
}

.btn-back {
  background-color: #008CBA;
}

.btn-back:hover {
  background-color: #007BB5;
}

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
