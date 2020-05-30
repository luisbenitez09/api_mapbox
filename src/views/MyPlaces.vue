<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app dark >
      <v-list dense>
        <template v-for="place in mapResult">
          
          <v-list-item  :key="place.name" link >
            <v-list-item-action>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ place.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
        </template>
      </v-list>
    </v-navigation-drawer>

    <AppBar
      name="My Places"
      color="#181e2c"
      actionName="Home"
    />

    <v-content>
      <v-container class="fill-height" fluid>
        
      </v-container>
    </v-content>

    <v-btn bottom color="#167ec5" dark fab fixed right
      @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <AddPlace
      v-if="dialog"
    ></AddPlace>
    
  </v-app>
</template>

<script>
import AppBar from './../components/AppBar'
import AddPlace from './../components/AddPlace'
import { mapMutations } from "vuex";
import { mapState } from 'vuex'
import axios from 'axios'

  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
    }),
    methods: {
      ...mapMutations(["SET_MAP_RESULT", "SET_LOGGED_AREA"]),
    },
    computed: {
    ...mapState(["userData","mapResult"] ),
  },
    mounted() {
      this.SET_LOGGED_AREA(true);
      axios
        .get("http://localhost:3000/lugares/getplacesFiltered", {
          params: {
            search: this.busqueda,
            id: this.userData.user.id,
          },
          headers: {
            authorization: this.userData.token,
          },
        })
        .then(response => {
          this.SET_MAP_RESULT(response.data.data);
          console.log(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    components: {
        AppBar,
        AddPlace
    }
  }
</script>