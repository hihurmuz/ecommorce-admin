const state = () => ({
    serverUrl: 'https://ecommerce-server-kappa.vercel.app/api',
    categories: null,
    product: null,
})
    
const mutations = {
    SET_CATEGORIES( state, payload ) {
        console.log(payload);
        state.categories = payload
    },
    SET_PRODUCT( state, payload ) {
        state.product = payload
    }
}
  
const actions = {
    
    getCategories(context) {
        return this.$axios.$get(`${context.state.serverUrl}/category`)
            .then((res) =>{
                let tempArr = []
                for (let i = 0; i < res.length; i++) {
                    tempArr.push({...res[i], index: i})
                }
                context.commit('SET_CATEGORIES', tempArr)
            })
            .catch((err) => {
                console.error(err)
            })
    },
    
    createMainCategory(context, category) {
        return this.$axios.$post(`${context.state.serverUrl}/category`, category)
    },
    
    createSubCategory(context, payload){
        return this.$axios.$post(`${context.state.serverUrl}/category/${payload.mainCategoryID}`, 
        { subCategory: payload.subCategory })
    },
    
    deleteCategory(context, payload) {
        switch (payload.type) {
            case 'main':
                this.$axios.$delete(`${context.state.serverUrl}/category/${payload._id}`);
                break;
                
            case 'sub':
                this.$axios.$put(`${context.state.serverUrl}/category/${payload._id}`, 
                {subCategory: payload.subCategory});
                break;
        }
    },
    
    getProduct({ state, commit },payload) {
        console.log(payload);
        return this.$axios.$get(`${state.serverUrl}/product/${payload}`)
            .then(res => {
                commit('SET_PRODUCT', res.product)
                console.error(res)
            })
            .catch((err) => {
                console.error(err)
            })
    },
    
    createProduct({ state },newProduct) {
        return this.$axios.$post(`${state.serverUrl}/product`,newProduct)
            .then((res) =>{
                console.log(res);
            })
            .catch((err) => {
                console.error(err)
            })
    },
    
    deleteProduct(context,payload){
        this.$axios.$delete(`${context.state.serverUrl}/product/${payload}`)
            .then(res => {
                console.error(res)
            })
            .catch((err) => {
                console.error(err)
            })
    },
    
    updateProduct(context, {productID, updatedProduct}) {
        return this.$axios.$put(`${state.serverUrl}/product/${productID}`,updatedProduct)
            .then(res => {
                console.error(res)
            })
            .catch((err) => {
                console.error(err)
            })
    },
    
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
