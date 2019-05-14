<template>
    <v-app>
        <!--<div id="app" class="container-fluid">
        <div class="row">
            <nav-menu params="route: route"></nav-menu>
        </div>
        <div class="row">
            <router-view></router-view>
        </div>
    </div>-->

        <v-container fluid>
            <v-layout row>
                <nav-menu v-if="userLogin" params="route: route"></nav-menu>
            </v-layout>

            <v-layout>
                <div style="height:80px;"></div>
            </v-layout>

            <v-layout row>
                <v-flex xs12>
                    <router-view class="viewContainer"></router-view>
                </v-flex>
            </v-layout>

        </v-container>

        <confirm />

        <message />

        <busyIndicator />

    </v-app>

</template>

<script>
    import NavMenu from './shared/nav-menu'
    import Confirm from './shared/confirm';
    import Message from './shared/message';
    import BusyIndicator from './shared/busyIndicator';

    import { mapState } from 'vuex'

    export default {
        components: {
            'nav-menu': NavMenu,
            'confirm': Confirm,
            'message': Message,
            'busyIndicator': BusyIndicator
        },

        data() {
            return {}
        },

        mounted() {
            //this.$root.$busyIndicator = this.$refs.busyIndicator
            //this.$root.$confirm = this.$refs.confirm.open
            //this.$root.$message = this.$refs.message.show
        },

        computed: {

            ...mapState({
                userLogin: 'userLogin',
            }),
        },

    }
</script>

<style>

    .viewContainer{
        margin-left: 20px;
        margin-right: 20px;
    }

</style>
