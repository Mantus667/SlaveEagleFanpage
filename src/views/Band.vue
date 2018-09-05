<template>
    <v-container fluid grid-list-md>
        <v-layout row>
            <v-layout column align-center>
                 <h1>The Band</h1>
            </v-layout>
        </v-layout>
        <v-layout row align-center justify-center wrap>
            <v-flex v-for="member in members" :key="member.id" xs12 md6 fill-height>
                 <v-card :to="{ path: '/band/' + member.name + '/' + member.id }">
                    <v-img
                        :src="imageBaseUrl + member.image.url"
                        aspect-ratio="2"
                        :max-height="200"
                        :alt="member.image.alternativeText"
                    ></v-img>

                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{member.name}}</h3>
                            <div v-html="member.bio"></div>
                        </div>
                    </v-card-title>

                    <v-card-actions>
                        <v-btn flat icon color="orange"><v-icon dark>twitter</v-icon></v-btn>
                        <v-btn flat icon color="orange"><v-icon dark>check_circle</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
             </v-flex>
        </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Umbraco from '@/services/umbraco'

@Component
export default class Band extends Vue {
    members : Array<object> = [];
    imageBaseUrl : string = this.$store.state.imageBaseUrl;

    created() {
        var comp = this;
        var umbraco = new Umbraco();
        umbraco.getChildren('df4e3636-9aee-4bba-9cc4-a333aeb488c4').then(
            function(data : any){
                comp.members = data.results;
            },
            function(reason : any){
                console.log(reason);
            }
        );
    }
}
</script>


<style lang="scss" scoped>

</style>

