<template>
    <v-container fluid grid-list-md v-if="member != null">
        <v-layout row align-center justify-center wrap>
           <v-flex>
               <v-img
                    :src="imageBaseUrl + member.image.url + '?width=300&height=300'"
                    :width="300"
                    :height="300"
                    :alt="member.image.alternativeText">
               </v-img>
           </v-flex>
           <v-flex>
               <h1>{{member.name}}</h1>
               <div v-html="member.bio"></div>
           </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Umbraco from '@/services/umbraco'

@Component
export default class BandMember extends Vue {
    member: any = null;
    imageBaseUrl : string = 'https://slave-eagle.s1.umbraco.io/';

    created () {
        var comp = this;
        var umbraco = new Umbraco();
        umbraco.getById(this.$route.params.id).then(
            function(data : any){
                console.log(data);
                comp.member = data;
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
