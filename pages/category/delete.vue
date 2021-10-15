<template>
    <b-card class="card-submit" bg-variant="light">
        <b-row>
            <b-col cols="12" md="4">
                <h5>Category Delete</h5>
            </b-col>
            <b-col cols="12" md="8">
                <b-form-group>          
                    <b-form-select 
                        value-field="index"
                        text-field="title"  
                        v-model="mainCategory" 
                        :options="categories" 
                        class="mt-2" />
                    <b-form-select             
                        v-model="subCategory" 
                        :options="getSubCategoryList" 
                        class="mt-2" /> 
                    <b-button variant="secondary" class="mt-5" @click="deleteCategory(tab)" block>Delete</b-button>             
                </b-form-group>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            mainCategory: null,
            subCategory: null
        }
    },
    methods: {
        ...mapActions(['deleteCategory']),
        deleteCategory() {
            let type = this.subCategory ? 'sub' : 'main'
            let _id = this.categories[this.mainCategory]._id
            this.deleteCategory({ type, _id})
        }
    },
    computed: {
        ...mapState(['categories']),
        getSubCategoryList() {
            if (this.mainCategory !== null) {
                return this.categories[this.mainCategory].subCategory
            } else {
                return []
            }
        }
    }
}
</script>

<style>

</style>