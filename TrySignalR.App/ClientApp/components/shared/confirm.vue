<template>
    <v-dialog v-model="dialog" :max-width="options.width" @keydown.esc="cancel" v-bind:style="{ zIndex: options.zIndex }" persistent>
        <v-card>
            <v-toolbar dark :color="options.color" dense flat>
                <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text v-show="!!message">{{ message }}</v-card-text>
            <v-card-actions class="pt-0">
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" flat="flat" @click.native="agree">Yes</v-btn>
                <v-btn color="grey" flat="flat" @click.native="cancel">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  /**
   * Vuetify Confirm Dialog component
   *
   * Insert component where you want to use it:
   * <confirm ref="confirm"></confirm>
   *
   * Call it:
   * this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {})
   * Or use await:
   * if (await this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' })) {
   *   // yes
   * }
   * else {
   *   // cancel
   * }
   *
   * Alternatively you can place it in main App component and access it globally via this.$root.$confirm
   * <template>
   *   <v-app>
   *     ...
   *     <confirm ref="confirm"></confirm>
   *   </v-app>
   * </template>
   *
   * mounted() {
   *   this.$root.$confirm = this.$refs.confirm.open
   * }
   */

    import { mapState } from 'vuex'

    export default {

        data: () => ({

        }),
        computed: mapState({
            dialog: 'dialog',
            resolve: 'resolve',
            reject: 'reject',
            message: 'message',
            title: 'title',
            options: 'optionsDialog',
        }),
        methods: {
            agree() {
                this.$store.commit('confirmAgree')
            },
            cancel() {
                this.$store.commit('confirmCancel')
            }
        }
    }
</script>
