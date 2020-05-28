<template>
  <v-app>
    <v-content>
      <v-container fluid id="container">
        <v-container fluid id="leftSide">
          <v-img src="./../assets/background_login.png" id="imgLeft"></v-img>
          <img id="logo" width="130px" src="./../assets/maap.svg" alt="MAAP" />
          <h1 id="title">
            The Next-Gen
            <br />Map Services
          </h1>
        </v-container>
        <v-container fluid id="rightSide">
          <v-container id="loginForm">
            <h2>Welcome</h2>
            <h3>Sign In</h3>
            <v-form>
              <v-container>
                <v-row>
                  <v-text-field
                    id="emailInput"
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    required
                    dark
                    color="success"
                  ></v-text-field>
                  <v-text-field
                    id="passInput"
                    v-model="password"
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passRules.required]"
                    :type="showPass ? 'text' : 'password'"
                    name="input-pass"
                    label="Password"
                    dark
                    color="success"
                    @click:append="showPass = !showPass"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-btn id="loginBtn" block color="primary" @click="login">Login</v-btn>
                </v-row>
              </v-container>
            </v-form>
          </v-container>
          <router-link to="/Register">
            <v-btn id="signBtn" text dark color="gray" rounded>
              Sign Up
              <v-icon right>mdi-account</v-icon>
            </v-btn>
          </router-link>
          <span id="waterMark">María Meza y Luis Benitez</span>
        </v-container>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "Email required",
      v => /.+@.+\..+/.test(v) || "Type a valid email"
    ],
    password: "",
    showPass: false,
    passRules: {
      required: value => !!value || "Password required",
      min: v => v.length >= 8 || "Min 8 characters"
    }
  }),
  methods: {
    ...mapMutations(["SET_DATA","SET_LOGGED"]),
    login() {
      if (/.+@.+\..+/.test(this.email) && this.password.length >= 8) {
        console.log("Datos validos");
        axios
          .post("http://localhost:3000/usuarios/login", {
            email: this.email,
            password: this.password
          })
          .then(response => {
            this.SET_DATA(response.data.data);
            this.SET_LOGGED(true);
            this.$router.push({ name: "Home" });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log("Datos no validos para ingresar.");
      }
    }
  }
};
</script>

<style lang="css" scoped>
#container {
  background-color: #181e2c;
  height: 100vh;
  padding: 0%;
}

#leftSide {
  padding: 0%;
  width: 45%;
  height: 100vh;
  position: relative;
  float: left;
}

#rightSide {
  padding: 0%;
  width: 55%;
  height: 100vh;
  position: relative;
  float: right;
}

#imgLeft {
  width: 60%;
  height: 100vh;
}

#title {
  position: absolute;
  top: 60%;
  right: 15%;
  font-family: "Montserrat";
  color: white;
  font-size: 40px;
}

#loginForm {
  width: 50%;
  height: 60vh;
  position: absolute;
  top: 10%;
  left: 10%;
}

h2 {
  font-family: "Montserrat";
  color: white;
  font-size: 40px;
}

h3 {
  font-family: "Montserrat";
  color: gray;
  margin-bottom: 50px;
}

#loginBtn {
  margin-top: 40px;
}

#signBtn {
  position: absolute;
  bottom: 3%;
  right: 3%;
}

#logo {
  position: absolute;
  top: 6%;
  left: 6%;
}

#waterMark {
  color: #3f4555;
  position: absolute;
  bottom: 2%;
  left: 1%;
  font-family: "Montserrat";
}

.router-link {
  color: white;
}
</style>
