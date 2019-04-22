import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deck_id: null,
    cards: []
  },
  mutations: {
    SET_DECKID (state, payload) {
      state.deck_id = payload['deck_id']
    },
    SET_CARDS (state, payload) {
      state.cards = payload
    }
  },
  actions: {
    async startTrick ({ dispatch }, payload) {
      try {
        await dispatch('newDeck')
        await dispatch('drawCards')
      } catch (e) {
        throw e
      }
    },
    async newDeck ({ commit }, payload) {
      try {
        const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        commit('SET_DECKID', deck.data)
      } catch (e) {
        throw e
      }
    },
    async drawCards ({ commit, state }, payload) {
      try {
        const cards = await axios.get(`https://deckofcardsapi.com/api/deck/${state.deck_id}/draw/?count=21`)
        commit('SET_CARDS', cards.data.cards)
      } catch (e) {
        throw e
      }
    }
  }
})
