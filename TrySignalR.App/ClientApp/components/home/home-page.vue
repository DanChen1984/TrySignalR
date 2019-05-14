<template>
    <div>

        <h3>Welcome to Chatting Room</h3>

        <v-container grid-list-md>
            <v-layout row wrap>

                <v-flex xs1>
                    <v-card>
                        <v-container ref="userScroll"
                                        style="height: 600px"
                                        class="scroll-y">
                            <v-layout column>
                                <div v-for="user in onlineUsers" class="userMargin">
                                    {{ user }}
                                </div>
                            </v-layout>
                        </v-container>                            
                    </v-card>
                </v-flex>

                <v-flex xs11>
                    <v-card>
                        <v-container ref="myScroll"
                                     style="height: 600px"
                                     class="scroll-y">
                            <v-layout column>
                                <div v-for="message in MessageHistory" class="messageMargin">
                                    {{ message }}
                                </div>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>

                <v-flex xs11 offset-xs1>
                    <v-card flat style="margin-left: 5px;">
                        <v-layout row>
                            <v-text-field solo v-model="Message" placeholder="please type your message.." v-on:keyup.native="sendMessageByEnter"></v-text-field>
                            <v-btn color="info" v-on:click.native="sendMessage">Send Message</v-btn>
                        </v-layout>
                    </v-card>
                </v-flex>

            </v-layout>
        </v-container>


    </div>
</template>


<script>
    import { mapState } from 'vuex'
    import { HubConnectionBuilder} from '@aspnet/signalr'

    export default {

        data() {
            return {
                connection: null,

                onlineUsers: [],

                MessageHistory: ["[ System ]: Connecting.."],
                Message: "",

                isNewMessage: false
            }
        },

        computed: {
            ...mapState({
                userLogin: 'userLogin',
            }),
        },

        methods: {

            sendMessage() {

                if (this.Message === null || this.Message === "") {
                    return;
                }

                try {
                    this.connection.invoke("SendMessage", this.userLogin, this.Message).catch(function (err) {
                        return console.error(err.toString());
                    });

                    this.Message = "";
                }
                catch (err) {
                    window.alert(err)
                    console.log(err)
                }
            },
            sendMessageByEnter(e) {
                if (e.keyCode === 13) {
                    this.sendMessage();
                }
            },
            appendMessage(user, message) {
                this.MessageHistory.push("[ " + user + " ]: " + message);
                this.isNewMessage = true;
            },
            connected() {
                this.MessageHistory.push("[ System ]: Connected. You can chat now..");

                this.connection.invoke("Connected", this.userLogin).catch(function (err) {
                    return console.error(err.toString());
                });
            },
            updateOnlineUsers(userList) {
                console.log(userList);
                this.onlineUsers = userList;
            },


            scrollToBottom() {

                if (!this.isNewMessage) {
                    return;
                }

                var scroll = this.$refs["myScroll"];
                scroll.scrollTop = 999999;
                this.isNewMessage = false;
            }
        }, 

        updated() {
            this.scrollToBottom()
        },

        created() {

            if (this.userLogin === undefined || this.userLogin === '') {
                this.$router.push({ path: '/' });
            }
            else {
                "use strict";

                var conn = new HubConnectionBuilder().withUrl("/chatHub").build();

                //Disable send button until connection is established
                //document.getElementById("sendButton").disabled = true;            

                conn.on("ReceiveMessage", this.appendMessage);

                conn.on("UpdateOnlineUsers", this.updateOnlineUsers);

                conn.start().then(this.connected).catch(function (err) {
                    return console.error(err.toString());
                });

                this.connection = conn;
            }
        }
    }
</script>

<style>
    .userMargin {
        margin-bottom: 20px;
    }
    .messageMargin {
        margin-bottom: 20px;
    }
</style>