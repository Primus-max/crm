<template>
    <div>
        <Loader v-if="loading"/>
        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">История</router-link>
                <a @click.prevent class="breadcrumb">
                    {{ record.type === 'income' ? 'Доход': 'Расход' }}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div
                            class="card"
                            :class="{
                                'red': record.type === 'outcome',
                                'green': record.type === 'income'
                            }"

                    >
                        <ul class="card-content white-text">
                            <li>Описание: {{ record.description }}</li>
                            <li>Сумма: {{ record.amount.toLocaleString('ru-Ru') + ' руб' }}</li>
                            <li>Категория: {{ record.categoryName }}</li>

                            <small>{{ record.date }}</small>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <p v-else class="center">Запись с таким id не найдена</p>
    </div>
</template>

<script>
    import Loader from "@/components/app/Loader";

    export default {
        name: 'detail',
        components: {Loader},
        data: () => ({
            record: null,
            loading: true
        }),
        async mounted() {
            const id = this.$route.params.id
            const record = await this.$store.dispatch('fetchRecordByID', id)
            const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)


            this.record = {
                ...record,
                categoryName: category.title,
            }

            this.loading = false
        }
    }
</script>

<style scoped>

</style>