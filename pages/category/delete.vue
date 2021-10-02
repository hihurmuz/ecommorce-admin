<template>
  <div class="w-75">
    <b-tabs content-class="mt-3">
      <b-form-select 
        value-field="index"
        text-field="title"  
        v-model="mainCategory" 
        :options="categories" 
        class="mt-2" />
      <b-tab title="Main Category">        
        <b-button variant="secondary" class="mt-5" @click="deleteCategory('main')" block>Delete</b-button>    
      </b-tab>
      <b-tab title="Sub Category">
        <b-form-select             
          v-model="subCategory" 
          :options="getSubCategoryList" 
          class="mt-2" />
        <b-button variant="secondary" class="mt-5" @click="deleteCategory('sub')" block>Delete</b-button>    
      </b-tab>
    </b-tabs>
  </div>
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
    created() {
        this.getAllCategoryData()
    },
    methods: {
        ...mapActions(['getCategories', 'deleteCategory']),
        getAllCategoryData() {
            this.getCategories()
        },
        deleteCategory(type) {
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