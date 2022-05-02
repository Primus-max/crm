<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">Текущий счет</span>

                <p class="currency-line">
                    <span>{{`${info.bill.toLocaleString('ru-RU')} руб` }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default{
    name: 'home-bill',
        computed:{
            ...mapGetters(['info']),

        },
    }
</script>

<style scoped>

</style>