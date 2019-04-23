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
  getters: {
    cardPileCodes (state) {
      return pileIndex => {
        return state.cards
          .filter((card, index) => index >= (0 + pileIndex * 7) && index <= (6 + pileIndex * 7))
          .map(card => {
            return card.code
          }).join(',')
      }
    }
  },
  actions: {
    async startTrick ({ dispatch }) {
      try {
        await dispatch('newDeck')
        await dispatch('drawCards')
      } catch (e) {
        throw e
      }
    },
    async newDeck ({ commit }) {
      try {
        const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        commit('SET_DECKID', deck.data)
      } catch (e) {
        throw e
      }
    },
    async drawCards ({ commit, state }) {
      try {
        const cards = await axios.get(`https://deckofcardsapi.com/api/deck/${state.deck_id}/draw/?count=21`)
        commit('SET_CARDS', cards.data.cards)
      } catch (e) {
        throw e
      }
    },
    async playRound ({ getters, dispatch, commit, state }, pileIndex) {
      try {
        const selectedPile = pileIndex
        let codes = {
          pile0: '',
          pile1: '',
          pile2: ''
        }
        // Retrieve Card Codes and Put the Selected Pile in the Middle
        if (selectedPile === 0) {
          codes.pile0 = getters.cardPileCodes(1)
          codes.pile1 = getters.cardPileCodes(0)
          codes.pile2 = getters.cardPileCodes(2)
        } else if (selectedPile === 1) {
          codes.pile0 = getters.cardPileCodes(0)
          codes.pile1 = getters.cardPileCodes(1)
          codes.pile2 = getters.cardPileCodes(2)
        } else {
          codes.pile0 = getters.cardPileCodes(0)
          codes.pile1 = getters.cardPileCodes(2)
          codes.pile2 = getters.cardPileCodes(1)
        }
        // Push Card Codes to API
        await dispatch('createPiles', codes)
      } catch (e) {
        throw e
      }
    },
    async createPiles ({ state }, cardCodes) {
      try {
        await axios.get(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/pile0/add/?cards=${cardCodes.pile0}`)
        await axios.get(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/pile1/add/?cards=${cardCodes.pile1}`)
        await axios.get(`https://deckofcardsapi.com/api/deck/${state.deck_id}/pile/pile2/add/?cards=${cardCodes.pile2}`)
      } catch (e) {
        throw e
      }
    }
  }
})
