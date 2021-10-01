const state = () => ({
    serverUrl: 'https://ecommerce-server-kappa.vercel.app/api',
    categories: null
})
    
const mutations = {
    SET_CATEGORIES( state, payload) {
        console.log(payload);
        state.categories = payload
    }
}
  
const actions = {
    createProduct({ state },newProduct) {
        return this.$axios.$post(`${state.serverUrl}/product`,newProduct)
            .then((res) =>{
                console.log(res);
            })
            .catch((err) => {
                console.error(err)
            })
    },
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
            
    }
    
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
