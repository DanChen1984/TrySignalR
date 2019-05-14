<template>
    <v-snackbar v-model="snackbar"
                :color="options.color"
                :multi-line="options.mode === 'multi-line'"
                :timeout="options.timeout"
                :vertical="options.mode === 'vertical'">
        {{ text }}
        <v-btn dark
               flat
               @click="close">
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                
            }
        },
        computed: mapState({
            snackbar: 'snackbar',
            text: 'text',
            options: 'optionsMessage',
        }),
        methods: {
            close() {
                this.$store.commit('closeMessage')
            }
        }
    }
</script>