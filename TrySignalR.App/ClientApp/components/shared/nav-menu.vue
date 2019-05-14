<template>
    <div class="main-nav">
        <nav class="navbar navbar-dark bg-dark" style="padding:0">

            <v-container fluid>
                <v-layout row>
                    <v-flex xs2>
                        <router-link class="navbar-brand" to="/"><icon :icon="['fab', 'microsoft']" /> ASP.NET Core SignalR</router-link>
                    </v-flex>
                    <v-flex xs8>
                        <ul style="list-style-type:none">
                            <li class="nav-item" v-for="(route, index) in menuItems" :key="index" style="float: left;">
                                <router-link :to="route.path" exact-active-class="active">
                                    <icon :icon="route.icon" class="mr-2" /><span>{{ route.display }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </v-flex>
                    <v-flex xs2>
                        <v-layout justify-end>
                            <div class="title font-weight-regular white--text marginRight">Hello, {{userLogin}}</div>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>

        </nav>
    </div>
</template>

<script>
    import { routes } from '../../router/routes'

    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                routes
            }
        },
        computed: {

            ...mapState({
                userLogin: 'userLogin',
            }),

            menuItems: function () {
                var menuItems = []
                this.routes.forEach((route) => {
                    if (route.menu != 'false') {
                        menuItems.push(route);
                    }
                });

                return menuItems;
            }
        }
    }
</script>

<style>
    .marginRight{
        margin-right: 20px;
    }
</style>
