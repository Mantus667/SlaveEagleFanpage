<template>
    <v-container fluid grid-list-md v-if="product !== null">
        <v-layout row>
            <v-layout column align-center>
                 <h1>{{product.name}}</h1>
            </v-layout>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-img :src="imageBaseUrl + product.image.url"></v-img>
                    <v-card-title primary-title>
                        <h3 class="headline mb-0">{{product.price}}&euro;</h3>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Umbraco from '@/services/umbraco'

@Component
export default class Band extends Vue {
    product: any = null;
    imageBaseUrl : string = this.$store.state.imageBaseUrl;
    umbraco: any = new Umbraco();

    fetchProduct(id:any) : void {
        var comp = this;
        comp.umbraco.getById(id).then(
            function(data : any){
                comp.product = data;
            },
            function(reason : any){
                console.log(reason);
            }
        );
    };

    @Watch('$route')
    routeChanged (to:any, from:any){
        this.fetchProduct(to.params.id);
    }

    created () {
        this.fetchProduct(this.$route.params.id);
    }
}
</script>
<style lang="scss" scoped>

</style>