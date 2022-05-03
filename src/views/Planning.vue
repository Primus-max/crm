<template>
    <div>
        <div class="page-title">
            <h3>Планирование</h3>
            <h4>{{`${info.bill.toLocaleString('ru-RU')} руб` }}</h4>
        </div>

        <Loader v-if="loading"/>
        <p class="center" v-else-if="!categories.length">Категории еще не созданы
            <router-link to="/categories">добавить категорию</router-link>
        </p>
        <section v-else>
            <div
                    v-for="cat of categories"
                    :key="cat.id"
                    v-tooltip="cat.tooltip"
            >
                <p>
                    <strong>{{cat.title}}:</strong>
                    {{cat.spend.toLocaleString('ru-RU') + ' руб'}} из {{cat.limit.toLocaleString('ru-RU')+ ' руб'}}
                </p>
                <div class="progress">
                    <div
                            class="determinate"
                            :class="[cat.progressColor]"
                            :style="{width: cat.progressPercent + '%'}"

                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Loader from "@/components/app/Loader"
    import {mapGetters} from 'vuex'

    export default {
        name: 'planning',
        components: {Loader},
        data: () => ({
            loading: true,
            categories: []
        }),
        computed: {
            ...mapGetters(['info'])
        },
        async mounted() {
            const records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')

            this.categories = categories.map(cat => {
                const spend = records
                    .filter(r => r.categoryId === cat.id)
                    .filter(r => r.type === 'outcome')
                    .reduce((total, record) => {
                        return total += +record.amount
                    }, 0)

                const percent = 100 * spend / cat.limit
                const progressPercent = percent > 100 ? 100 : percent
                const progressColor = percent < 60
                    ? 'green'
                    : percent < 100
                        ? 'yellow'
                        : 'red'

                const tooltipValue = cat.limit - spend
                const tooltip = `${tooltipValue < 0 ? 'Превышение на': 'Осалось'} ${Math.abs(tooltipValue).toLocaleString('ru-RU')+ ' руб'}`

                return {
                    ...cat,
                    progressPercent,
                    progressColor,
                    spend,
                    tooltip
                }
            })

            this.loading = false
        },
    }
</script>

<style scoped>

</style>