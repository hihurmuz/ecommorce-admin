<template>
    <b-card class="card-submit" bg-variant="light">
        <b-row>
            <b-col cols="12" md="4">
                <h5>Product Create</h5>
            </b-col>
            <b-col cols="12" md="8">
                <b-form-group>          
                    <b-form-input class="mt-3 mb-3" v-model="title" placeholder="Title" /> 
                    <b-form-input class="mt-3 mb-3" v-model="price" placeholder="Price" />
                    <b-form-input class="mt-3 mb-3" v-model="stockNumber" placeholder="Stock Number" />
                    <b-form-input class="mt-3 mb-3" v-model="summary" placeholder="Product Summary" />
                    <b-form-tags class="mt-3 mb-3" v-model="features" placeholder="Add Features" />
                    <b-form-tags class="mt-3 mb-3" v-model="description" placeholder="Add Decriciption" />
                    <b-form-tags class="mt-3 mb-2" v-model="photo" placeholder="Add Photo Link" />
                    <b-form-select  class="mt-2 mb-2" value-field="index" text-field="title" v-model="mainCategory" :options="categories" />
                    <b-form-select class="mt-2 mb-2" v-model="subCategory" :options="subcategoryList(mainCategory)" />
                    <b-button class="mt-2 mb-2" variant="dark" block :disabled="!allValueValid" @click="postProduct">Create</b-button>
                </b-form-group>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            title:null,
            price:null,
            stockNumber:null,
            description:null,
            photo:null,
            mainCategory: 0,
            subCategory:null,
            summary:null,
            features: null,
        }
    },
    mounted() {
        this.subCategory = this.subcategoryList(0)[0] // TODO: check this
    },
    computed: {
        ...mapState(['categories']),
        ...mapGetters(['subcategoryList']),
        allValueValid(){
            if(
                this.title && 
                this.price && 
                this.stockNumber && 
                this.summary &&
                this.features &&
                this.description && 
                this.photo && 
                this.mainCategory !== null && 
                this.subCategory !== null
            ){
                return true
            } else {
                return false
            }
        },
    },
    methods: {
        ...mapActions(['createProduct']),
        postProduct(){
            let newProduct={
                title:this.title,
                price:this.price,
                stockNumber:this.stockNumber,
                summary: this.summary,
                features: this.features,
                description:this.description,
                photo:this.photo,
                mainCategory: this.categories[this.mainCategory].title,
                subCategory:this.subCategory,
            }
            this.createProduct(newProduct)
        }
    }
}
</script>

<style>

</style>