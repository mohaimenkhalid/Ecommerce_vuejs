import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import createPersistedState from 'vuex-persistedstate'


const store = new Vuex.Store({
  state: {

  	appName: "Ecommerce Vue",
    cart: [],
   
  },

  mutations: {

    addToCart(state, payload){

      return state.cart.push(payload);
    },

    removeFromCart(state, payload){
        state.cart.splice(payload, 1);
    }
  },

  actions:{

  },

  getters: {
    getAppName: state => {
      return state.appName;
    },

    getCart: state => {
      return state.cart;
    },

    getTotal: state => {
       var total = 0;
        for(var i =0; i< state.cart.length; i++ ){
           var item = state.cart[i];
            total += item.quantity * item.product.price;
        }
        return total;
    },
  },

  plugins: [createPersistedState()]


  
})


export default store;