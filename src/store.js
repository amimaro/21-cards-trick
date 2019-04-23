import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deck_id: null,
    cards: [],
    round: 0,
    apiURL: 'https://deckofcardsapi.com/api/deck',
    showModal: true,
    loading: true,
  },
  mutations: {
    SET_DECKID (state, deckId) {
      state.deck_id = deckId
    },
    SET_CARDS (state, cards) {
      state.cards = cards
    },
    INCREMENT_ROUND (state) {
      state.round++
      state.showModal = true
    },
    RESET_ROUND (state) {
      state.round = 0
      state.showModal = true
    },
    TOGGLE_MODAL (state) {
      state.showModal = !state.showModal
    }, 
    TOGGLE_LOADING (state) {
      state.loading = !state.loading
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
    async startTrick ({ dispatch, commit }) {
      try {
        await dispatch('newDeck')
        await dispatch('drawCards')
        commit('TOGGLE_LOADING')
      } catch (e) {
        throw e
      }
    },
    async newDeck ({ commit, state }) {
      try {
        const deck = await axios.get(`${state.apiURL}/new/shuffle/?deck_count=1`)
        commit('SET_DECKID', deck.data['deck_id'])
      } catch (e) {
        throw e
      }
    },
    async drawCards ({ commit, state }) {
      try {
        const cards = await axios.get(`${state.apiURL}/${state.deck_id}/draw/?count=21`)
        commit('SET_CARDS', cards.data['cards'])
      } catch (e) {
        throw e
      }
    },
    async restartTrick ({ commit, state }) {
      try {
        commit('TOGGLE_LOADING')
        await axios.get(`${state.apiURL}/${state.deck_id}/shuffle/`)
        const cards = await axios.get(`${state.apiURL}/${state.deck_id}/draw/?count=21`)
        commit('SET_CARDS', cards.data['cards'])
        commit('RESET_ROUND')
      } catch (e) {
        throw e
      } finally {
        commit('TOGGLE_LOADING')
      }
    },
    async playRound ({ getters, dispatch, commit, state }, pileIndex) {
      try {
        commit('TOGGLE_LOADING')
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
        // Join the piles of Cards
        await dispatch('rearrangeCards')
        commit('INCREMENT_ROUND')
      } catch (e) {
        throw e
      } finally {
        commit('TOGGLE_LOADING')
      }
    },
    async createPiles ({ state }, cardCodes) {
      try {
        await axios.get(`${state.apiURL}/${state.deck_id}/pile/pile0/add/?cards=${cardCodes.pile0}`)
        await axios.get(`${state.apiURL}/${state.deck_id}/pile/pile1/add/?cards=${cardCodes.pile1}`)
        await axios.get(`${state.apiURL}/${state.deck_id}/pile/pile2/add/?cards=${cardCodes.pile2}`)
      } catch (e) {
        throw e
      }
    },
    async rearrangeCards ({ commit, state }) {
      try {
        let cards = []
        const pile0 = await axios.get(`${state.apiURL}/${state.deck_id}/pile/pile0/draw/?count=7`)
        const pile1 = await axios.get(`${state.apiURL}/${state.deck_id}/pile/pile1/draw/?count=7`)
        const pile2 = await axios.get(`${state.apiURL}/${state.deck_id}/pile/pile2/draw/?count=7`)
        let piles = [...pile0.data.cards, ...pile1.data.cards, ...pile2.data.cards]
        // Convert rows to columns
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 3; j++) {
            console.log(i + 7 * j, 3 * i + j)
            cards[i + 7 * j] = piles[j + i * 3]
          }
        }
        commit('SET_CARDS', cards)
      } catch (e) {
        throw e
      }
    },
    async toggleModal ({ commit }) {
      commit('TOGGLE_MODAL')
    }
  }
})
