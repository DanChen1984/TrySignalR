import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// STATE
const state = {
    //Common Module
    //busy indicator
    isBusy: false,
    busyContent: 'please wait..',

    //dialog
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    optionsDialog: {
        color: 'primary',
        width: 400,
        zIndex: 200
    },

    //message
    snackbar: false,
    text: 'Hello, I\'m a snackbar',
    optionsMessage: {
        color: 'primary',
        mode: '',
        timeout: 6000,
        vertical: ''
    },

    //chatting room
    userLogin: '',

    connection: null,

    onlineUsers: [],

    messageHistory: ["[ System ]: Connecting.."],

    message: "",

    isNewMessage: false,

}

// MUTATIONS
const mutations = {

    //Common Module
    //busy indicator
    showBusyIndicator(state) {
        showBusyIndicator(state, 'please wait..')
    },
    showBusyIndicator(state, message) {
        state.busyContent = message
        state.isBusy = true
    },
    hideBusyIndicator(state) {
        state.isBusy = false
    },

    //dialog
    showConfirmDialog(state, payload) {
        state.dialog = true
        state.title = payload.title
        state.message = payload.message
        state.optionsDialog = Object.assign(state.optionsDialog, payload.options)
        return new Promise((resolve, reject) => {
            state.resolve = resolve
            state.reject = reject
        })
    },
    confirmAgree() {
        state.resolve(true)
        state.dialog = false
    },
    confirmCancel() {
        state.resolve(false)
        state.dialog = false
    },

    //message
    showMessage(state, payload) {

        state.optionsMessage.color = 'primary'

        state.snackbar = true
        state.text = payload.text
        state.optionsMessage = Object.assign(state.optionsMessage, payload.options)
    },
    closeMessage() {
        state.snackbar = false
    }, 

    //chatting room
    updateMessageHistory(state, payload) {
        state.messageHistory.push(payload.message)
    },

    updateState(state, payload) {

        if (payload.key === 'userLogin') {
            state.userLogin = payload.value
        }

        if (payload.key === 'connection') {
            state.connection = payload.value
        }

        if (payload.key === 'onlineUsers') {
            state.onlineUsers = payload.value
        }

        if (payload.key === 'message') {
            state.message = payload.value
        }

        if (payload.key === 'isNewMessage') {
            state.isNewMessage = payload.value
        }
        
    }
}

// ACTIONS
const actions = ({
  
    showConfirmDialog(context, payload) {

        context.commit('showConfirmDialog', payload)

        return new Promise((resolve, reject) => {
            state.resolve = resolve
            state.reject = reject
        })
    },
       
    //async loadFilters(context) {
    //    try {

    //        if (state.statusOptions.length === 0 || state.divisionOptions.length === 0 || state.dcOptions.length === 0 || state.reasonCodeOptions.length === 0) {

    //            context.commit('showBusyIndicator', 'loading filter options ..')

    //            //let response = await this.$http.get(`/api/process/GetFilterOptions`)
    //            let response = await axios.get(`/api/process/GetFilterOptions`)

    //            console.log(response.data.statusOptions)
    //            console.log(response.data.divOptions)
    //            console.log(response.data.dcOptions)
    //            console.log(response.data.reasonCodeOptions)

    //            context.commit('setFilterOptions', { response: response })

    //            context.commit('hideBusyIndicator')
    //        }

    //        return new Promise((resolve, reject) => {                
    //            resolve()
    //        })
    //    }
    //    catch (err) {
    //        window.alert(err)
    //        console.log(err)
    //    }
    //},

})

export default new Vuex.Store({
  state,
  mutations,
  actions
})
