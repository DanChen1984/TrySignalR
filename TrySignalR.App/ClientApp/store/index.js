import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// STATE
const state = {

    userLogin: '',

    //testCount:0,

    //isBusy: false,
    //busyContent: 'please wait..',

    //dialog: false,
    //resolve: null,
    //reject: null,
    //message: null,
    //title: null,
    //optionsDialog: {
    //    color: 'primary',
    //    width: 400,
    //    zIndex: 200
    //},

    //snackbar: false,
    //text: 'Hello, I\'m a snackbar',
    //optionsMessage: {
    //    color: 'primary',
    //    mode: '',
    //    timeout: 6000,
    //    vertical: ''
    //},

    //detailWpid: 0,

    ////Filters
    //statusOptions: [],
    //selectedStatus: null,

    //divisionOptions: [],
    //selectedDivision: null,

    //dcOptions: [],
    //selectedDc: null,

    //reasonCodeOptions: [],
    //selectedReasonCode: null,

    //selectedWsoNbr: null,

    //selectedDateFrom: null,
    //menuFrom: false,

    //selectedDateTo: null,
    //menuTo: false,

    //selectedIncludeUnmatched: true,
}

// MUTATIONS
const mutations = {
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

    showMessage(state, payload) {

        state.optionsMessage.color = 'primary'

        state.snackbar = true
        state.text = payload.text
        state.optionsMessage = Object.assign(state.optionsMessage, payload.options)
    },
    closeMessage() {
        state.snackbar = false
    },

    userJoin(state, payload) {
        state.userLogin = payload.userLogin
    },

    //selectWpid(state, payload) {
    //    state.detailWpid = payload.detailWpid
    //},

    //setFilterOptions(state, payload) {
    //    state.statusOptions = payload.response.data.statusOptions
    //    state.divisionOptions = payload.response.data.divOptions
    //    state.dcOptions = payload.response.data.dcOptions
    //    state.reasonCodeOptions = payload.response.data.reasonCodeOptions

    //    if (state.statusOptions.length > 0) {
    //        state.selectedStatus = state.statusOptions[0]
    //    }
    //},

    //updateState(state, payload) {

    //    if (payload.key === 'selectedStatus') {
    //        state.selectedStatus = payload.value
    //    }

    //    if (payload.key === 'selectedDivision') {
    //        state.selectedDivision = payload.value
    //    }

    //    if (payload.key === 'selectedDc') {
    //        state.selectedDc = payload.value
    //    }

    //    if (payload.key === 'selectedReasonCode') {
    //        state.selectedReasonCode = payload.value
    //    }

    //    if (payload.key === 'selectedReasonCode') {
    //        state.selectedReasonCode = payload.value
    //    }

    //    if (payload.key === 'selectedWsoNbr') {
    //        state.selectedWsoNbr = payload.value
    //    }

    //    if (payload.key === 'selectedDateFrom') {
    //        state.selectedDateFrom = payload.value
    //    }

    //    if (payload.key === 'menuFrom') {
    //        state.menuFrom = payload.value
    //    }

    //    if (payload.key === 'selectedDateTo') {
    //        state.selectedDateTo = payload.value
    //    }

    //    if (payload.key === 'selectedIncludeUnmatched') {
    //        state.selectedIncludeUnmatched = payload.value
    //    }
    //}
}

// ACTIONS
const actions = ({
  //setCounter ({ commit }, obj) {
  //  commit(MAIN_SET_COUNTER, obj)
  //}

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
