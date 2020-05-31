<template>
   <v-dialog width="800px" v-model="dialog">
      <v-card>
        <v-card-title>
          Add Place
        </v-card-title>
        <v-container>
          <v-row class="mx-2">

            <v-col class="align-center justify-space-between" cols="6" >
              <v-row align="center" class="mr-0" >
                <v-text-field placeholder="Name" v-model="name"></v-text-field>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-text-field placeholder="Categories" v-model="cats"></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-label>Price</v-label>
              <v-rating
                v-model="price"
                length="5"
                empty-icon="mdi-currency-usd-off"
                full-icon="mdi-currency-usd"
                hover
                color="green"
                background-color=""
              ></v-rating>
            </v-col>

            <v-col cols="6">
              <v-label>Rank</v-label>
              <v-rating
                v-model="rank"
                length="5"
                hover
                color="yellow darken-2"
                background-color=""
              ></v-rating>
            </v-col>

            <v-col cols="12">
              <v-text-field placeholder="Address" v-model="address"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field placeholder="Description" v-model="desc"></v-text-field>
            </v-col>

            <v-col>
              <v-label>Image</v-label>
              <v-file-input
                v-model="image"
                accept="image/*"
                label="Image Input"
                chips
                clearable
                color="primary"
              ></v-file-input>
            </v-col>

            <v-col cols="6">
              <v-label>Color</v-label>
              <v-color-picker
                v-model="color"
                disabled
                hide-canvas
                hide-inputs
                show-swatches  
              ></v-color-picker>
            </v-col>

            <v-col cols="12">
                <v-label>Location</v-label>
                <v-container id="mapCont">
                    <addMap id="addMap"></addMap>
                </v-container>
                
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 
</template>

<script>
import { mapState } from 'vuex'
import addMap from './Atoms/AddMap'
import axios  from 'axios'

export default {
    name: "AddPlace",
    components: {
        addMap,
    },
    data () {
        return {
            dialog: true,
            name: "",
            cats: "",
            price: 0,
            rank: 0,
            address: "",
            desc: "",
            image: null,
            color: "",
            lat: "",
            long: "",
            fieldRules: {
              required: value => !!value || "Required!"
            },
        }
    },
    computed: {
      ...mapState(["mapPin","userData"])
    },
    watch: {
        mapPin() {
            this.lat = this.mapPin[0].lat;
            this.long = this.mapPin[0].long;
        }
    },
    methods: {
        add() {
          console.log(this.userData.user.id);
            axios
            .post("http://localhost:3000/lugares/createPlace", {
              name: this.name,
              lat: this.lat,
              long: this.long,
              dir: this.address,
              color: this.color,
              img: this.image.name,
              rank: this.rank,
              price: this.price,
              cat: this.cats,
              desc: this.desc,
              userId: this.userData.user.id,
            },
            {
              headers: {
                authorization: this.userData.token,
              }
            })
            .catch(error => {
              console.log(error);
            });
            this.dialog = false;
        }
    },
}
</script>
<style lang="css" scoped>
    #mapCont {
        width: 50vw;
        height: 50vh;
    }
</style>