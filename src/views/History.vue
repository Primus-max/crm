<template>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <div class="history-chart">
            <div>
                <canvas ref="canvas"></canvas>
            </div>
        </div>

        <Loader v-if="loading"/>

        <p class="center" v-else-if="!records.length">Записей пока нет,
            <router-link to="/record">добавьте первую</router-link>
        </p>

        <section v-else>
            <history-table
                    :records="items"
            />
        </section>

        <!--                <Paginate-->
        <!--                        :page-count="pageCount"-->

        <!--                        :prev-text="'Prev'"-->
        <!--                        :next-text="'Next'"-->
        <!--                        :container-class="'waves-effect'">-->
        <!--                </Paginate>-->

        <div v-if="allItems.length" class="pagination-wrapper">
            <ul class="pagination">
                <li
                        class="waves-effect"
                        :class="{'disabled': page < 1}"
                        @click="prevChangePage(page - 1)"
                >
                    <a>
                        <i class="material-icons">
                            chevron_left
                        </i>
                    </a>
                </li>
                <li
                        v-for="(pageNumber, idx ) in allItems"
                        :key="idx"
                        class="waves-effect"
                        :class="{'active teal': idx === page}"
                        @click.prevent="changePage(idx)"
                        :page="page"




                >
                    <a>{{ idx + 1}}</a></li>
                <!--                <li class="waves-effect"><a href="#!">2</a></li>-->
                <!--                <li class="waves-effect"><a href="#!">3</a></li>-->
                <!--                <li class="waves-effect"><a href="#!">4</a></li>-->
                <!--                <li class="waves-effect"><a href="#!">5</a></li>-->
                <li
                        class="waves-effect"
                        :class="{'disabled': page === allItems.length - 1}"
                        @click="nextChangePage(page + 1)"
                >
                    <a>
                        <i class="material-icons">
                            chevron_right
                        </i>
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <!--    <Paginate v-model="page" :records="500" :per-page="25" @paginate="pageChangeHandler"/>-->
</template>

<script>
    import HistoryTable from "@/components/HistoryTable"
    import Loader from "@/components/app/Loader"
    import mixinPagination from '@/mixins/mixin.pagination'
    import { Pie } from 'vue-chartjs'


    export default {
        name: 'history',
        extends: Pie,
        components: {Loader, HistoryTable},
        mixins: [mixinPagination],
        data: () => ({
            loading: true,
            records: [],

        }),
        async mounted() {
            this.records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')

            this.setup(categories)

            this.renderChart({
                labels: categories.map(c => c.title),
                datasets: [{
                    label: 'Проценты расходов',
                    data: categories.map(c => {
                        return this.records.reduce((total, r)=> {
                            if(r.categoryId === c.id && r.type === 'outcome'){
                                total += +r.amount
                            }
                            return total
                        }, 0)
                    }),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },)
            this.loading = false

        },
        computed: {
            getTotalPage() {
                return this.totalCountPage = Math.ceil(this.records.length / this.pageSize)
            }
        },
        methods: {
            setup(categories){
                this.setupPagination(this.records.map(record => {
                    return {
                        ...record,
                        categoryName: categories.find(c => c.id === record.categoryId)?.title,
                        typeClass: record.type === 'income' ? 'green' : 'red',
                        typeText: record.type === 'income' ? 'Доход' : 'Расход',
                    }
                }))
            }
        }
    }
</script>

<style scoped>
    .pagination-wrapper {
        padding: 35px 0;
        margin: 0 auto;

        display: flex;
        align-items: center;
        justify-content: center;


    }

</style>