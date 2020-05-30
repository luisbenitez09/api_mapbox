<template>
   <v-dialog width="400px" v-model="dialog">
      <v-card>
        <v-card-title>
          Delete Place
        </v-card-title>
        <v-container>
          <v-row class="mx-2">

            <v-col class="align-center justify-space-between" cols="6" >
              <v-row align="center" class="mr-0" >
                <v-label>Are you sure you want to delete this place?</v-label>
              </v-row>
            </v-col>

          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="red darken-2" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="borrarPlace">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

export default {
    name: "DeleteDialog",
    data () {
        return {
            dialog: true,
        }
    },
    computed: {
      ...mapState(["userData", "placeSelected"])
    },
    methods: {
      ...mapMutations(["SET_MAP_RESULT"]),
        borrarPlace() {
            
            axios
            .put("http://localhost:3000/lugares/delete", 
            {
                id: this.placeSelected.id,
            },
            {
                headers: {
                    authorization: this.userData.token
            }
            })
            .then(response => {
                console.log(response);
                
            })
            .catch(error => {
                console.log(error);
            });
            axios
            .get("http://localhost:3000/lugares/getplacesFiltered", {
              params: {
                search: "",
                id: this.userData.user.id
              },
              headers: {
                authorization: this.userData.token
              }
            })
            .then(response => {
              console.log("response");
              console.log(response.data.data);
              this.SET_MAP_RESULT(response.data.data);
              
            })
            .catch(error => {
              console.log(error);
            });

            this.dialog = false;
        }
    },
}
</script>

