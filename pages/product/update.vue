<template>
    <div>
        <b-card class="card-submit" bg-variant="light">
            <b-row>
                <b-col cols="12" md="4">
                    <h5>Get Product From ID</h5>
                </b-col>
                <b-col cols="12" md="8">
                    <b-form-group>
                        <b-form-input v-model="productID" placeholder="Product ID" />
                        <b-button variant="dark" class="mt-5" block  @click="getProductOne">Get Product</b-button>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-card>
        <b-card v-if="product" class="card-submit" bg-variant="light">
            <b-row>
                <b-col cols="12" md="4">
                    <h5>Update Product Info</h5>
                </b-col>
                <b-col cols="12" md="8">
                    <b-form-group>
                        <b-form-input class="mt-3 mb-3" v-model="item.title" placeholder="Title" />
                        <b-form-input class="mt-3 mb-3" v-model="item.price" placeholder="Price" />
                        <b-form-input class="mt-3 mb-3" v-model="item.stockNumber" placeholder="Stock Number" />
                        <b-form-tags class="mt-3 mb-3" v-model="item.description" placeholder="Add Decriciption" />
                        <b-form-tags class="mt-3 mb-2" v-model="item.photo" placeholder="Add Photo Link" />
                        <b-form-select  class="mt-2 mb-2" value-field="title" text-field="title" v-model="item.mainCategory" :options="categories" />
                        <b-form-select class="mt-2 mb-2" v-model="item.subCategory" :options="subcategoryList(item.mainCategory)" />
                        <b-button class="mt-2 mb-2" variant="dark" block :disabled="!allValueValid" @click="putProduct">Update</b-button>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            productID:null,
            item: {
                title:null,
                price:null,
                stockNumber:null,
                description:null,
                photo:null,
                mainCategory:null,
                subCategory:null,
            }
        }
    },
    computed: {
        ...mapState(['product', 'categories']),
        ...mapGetters(['subcategoryList']),
        allValueValid(){
            if(
                this.item.title && 
                this.item.price && 
                this.item.stockNumber && 
                this.item.description && 
                this.item.photo && 
                this.item.mainCategory && 
                this.item.subCategory){
                return true
            }else{
                return false
            }
        }
    },
    methods: {
        ...mapActions(['getProduct', 'updateProduct']),
        getProductOne(){
            this.getProduct(this.productID)
        },
        putProduct(){
            this.updateProduct({
                productID: this.productID,
                updatedProduct: this.item
            })
        }
    },
    watch: {
        product: {
            deep: true,
            handler(val) {
                this.item = { ...this.items, ...val}
            }
        }
    }
}
</script>

<style>

</style>