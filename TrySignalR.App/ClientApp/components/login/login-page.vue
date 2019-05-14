<template>
    <v-layout align-center justify-center row>
        <v-card style="width: 500px;">

            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                   height="200px">
            </v-img>

            <v-card-title>
                <v-layout justify-center>
                    <h1>Welcome to Chatting Room</h1><br>
                </v-layout>
            </v-card-title>

            <v-card-actions>

                <v-container>
                    <v-layout row justify-center>
                        <v-text-field solo v-model="username" placeholder="please type your name to join the chatting" v-on:keyup.native="joinByEnter"></v-text-field>
                    </v-layout>

                    <v-layout row justify-end>
                        <v-btn color="blue" v-on:click.native="join">Join >></v-btn>
                    </v-layout>
                </v-container>

            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script>
    import { mapState } from 'vuex'

    export default {

        data() {
            return {
                username: ''
            }
        },

        methods: {

            join() {
                this.$store.commit('updateState', { key: 'userLogin', value: this.username })
                this.$router.push({ path: 'home' })                
            },
            joinByEnter(e) {
                if (e.keyCode === 13) {
                    this.join();
                }
            },
        },

        created() {            

        }
    }
</script>

<style>

</style>