<template>
    <div>
        <div>
            <b-card bg-variant="light">
                <b-form-group
                label-cols-lg="3"
                label="Product Get"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0"
                >
                <b-form-group
                    label-cols-sm="3"
                    label="Product ID:"
                    label-align-sm="right"
                    label-for="nested-street"
                >
                    <b-form-input v-model="productID" id="nested-street"></b-form-input>
                    <b-button variant="dark" class="mt-5" block  @click="getProductOne">Get</b-button>  
                </b-form-group>     
                </b-form-group>
            </b-card>
        </div>
        <div v-if="product" class="mt-3">
            <b-card bg-variant="light">
                <b-form-group
                    label-cols-lg="3"
                    label="Product Update"
                    label-size="lg"
                    label-class="font-weight-bold pt-0"
                    class="mb-0"
                >
                <b-form-group
                    label-cols-sm="3"
                    label="Title:"
                    label-align-sm="right"
                    label-for="nested-street"
                >
                    <b-form-input v-model="item.title" id="nested-street"></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="Price:"
                    label-align-sm="right"
                    label-for="nested-city"
                >
                    <b-form-input v-model="item.price" id="nested-city"></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="Stock Number:"
                    label-align-sm="right"
                    label-for="nested-state"
                >
                    <b-form-input v-model="item.stockNumber" id="nested-state"></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="Description:"
                    label-align-sm="right"
                    label-for="nested-country"
                >
                    <b-form-tags input-id="tags-basic" v-model="item.description" class="mb-2" placeholder="Add Decriciption"></b-form-tags>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="Photo:"
                    label-align-sm="right" class="mb-0"
                >
                    <b-form-tags input-id="tags-basic" v-model="item.photo" placeholder="Add Photo Link" class="mb-2"></b-form-tags>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="Main Category:"
                    label-align-sm="right"
                    label-for="main-state"
                >
                    <b-form-select v-model="item.mainCategory" :options="options" class="mt-2"></b-form-select>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="Sub Category:"
                    label-align-sm="right"
                    label-for="sub-state"
                >
                    <b-form-select v-model="item.subCategory" :options="subCategoryOptions" class="mt-2"></b-form-select>
                    <b-button variant="dark" class="mt-5" block :disabled="!allValueValid" 
                    @click="putProduct">Update</b-button>  
                </b-form-group>
                
                </b-form-group>
            </b-card>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
            },
            options: [
                { value: null, text: 'Please select a main category',disabled: true },
                { value: 'A', text: 'A' },
                { value: 'B', text: 'B' },
                { value: 'C', text: 'C' },
                ],
        }
    },
    computed: {
        ...mapState(['product']),
        subCategoryOptions: function(){
            if(this.mainCategory === 'A'){
                let sub = [
                    { value: null, text: 'Please select a sub category',disabled: true },
                    { value: '1', text: '1' },
                    { value: '2', text: '2' },
                    { value: '3', text: '3' },
                    ];
                return sub
            }else if(this.mainCategory === 'B'){
                 let sub = [
                    { value: null, text: 'Please select a sub category',disabled: true },
                    { value: '4', text: '4' },
                    { value: '5', text: '5' },
                    { value: '6', text: '6' },
                    ];
                return sub
            }else if(this.mainCategory === 'C'){
                 let sub = [
                    { value: null, text: 'Please select a sub category',disabled: true },
                    { value: '7', text: '7' },
                    { value: '8', text: '8' },
                    { value: '9', text: '9' },
                    ];
                return sub
            }else{
                let sub = [
                    { value: null, text: 'Please select a main category first ',disabled: true },                    
                    ];
                return sub
            }
        },
        allValueValid: function(){
            if(this.title && this.price && this.stockNumber && this.description && this.photo 
            && this.mainCategory && this.subCategory){
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