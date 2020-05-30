<template lang="html">
    <v-app-bar 
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    :name="name"
    :color="color"
    :actionName="actionName"
    app
    dark >
      <v-img
          alt="MAAP"
          class="shrink mr-2"
          contain
          src = "./../assets/maap.png"
          transition="scale-transition"
          width="90"
        ></v-img>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4" >
        <span class="hidden-sm-and-down">{{ name }}</span>
      </v-toolbar-title>
      <searchbar/>
      <v-spacer></v-spacer>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-apps</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="navigation" v-if="isLogged">
            <v-list-item-title>{{ actionName }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout" v-if="isLogged">
            <v-list-item-title>LogOut</v-list-item-title>
          </v-list-item>
          <v-list-item @click="login" v-else>
            <v-list-item-title>LogIn</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
</template>
<script>
import Searchbar from "./Searchbar";
import { mapMutations, mapState } from "vuex";

export default {
  name: "AppBar",
  data () {
      return {
        
      }
  },
  components: {
    Searchbar
  },
  props: [
    "name",
    "color",
    "actionName",
  ],
  computed: {
    ...mapState(["isLogged"]),
  },
  methods: {
    ...mapMutations(["SET_DATA","SET_LOGGED","SET_LOGGED_AREA","SET_MAP_RESULT","SET_MAP_PIN","SET_WIDGET","SET_PLACE_SELECTED"]),
    logout() {
      this.SET_DATA({});
      this.SET_MAP_RESULT({});
      this.SET_MAP_PIN({});
      this.SET_WIDGET(true);
      this.SET_LOGGED(false);
      this.SET_LOGGED_AREA(false);
      this.SET_PLACE_SELECTED(null);
      this.$router.push({ name: "Home" });
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    navigation() {
        if (this.actionName == "Home") {
            this.SET_MAP_RESULT({});
            this.SET_MAP_PIN({});
            this.SET_WIDGET(true);
            this.SET_LOGGED_AREA(false);
            this.SET_PLACE_SELECTED(null);
            this.$router.push({ name: "Home" });
        } else {
            this.$router.push({ name: "MyPlaces" });
        }
    }
  }
};
</script>
    
