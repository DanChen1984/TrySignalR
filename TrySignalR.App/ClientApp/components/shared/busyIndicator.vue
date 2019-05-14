<template>

    <div>
        <v-dialog v-model="isBusy"
                  persistent
                  width="300">
            <v-card color="primary"
                    dark>
                <v-card-text>
                    <label>{{busyContent}}</label>
                    <v-progress-linear indeterminate
                                       color="white"
                                       class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>

</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
            }
        },
        computed: mapState({
            isBusy: 'isBusy',
            busyContent: 'busyContent',
        }),
        methods: {

        }
    }
</script>