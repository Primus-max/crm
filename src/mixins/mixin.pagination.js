import _ from 'lodash'

export default {
    data() {
        return {
            page: +this.$route.query.page || 1,
            pageSize: 3,
            pageCount: 0,
            allItems: [],
            items: [],
        }
    },
    methods: {
        setupPagination(allItems) {
            this.allItems = _.chunk(allItems, this.pageSize)
            this.pageCount = _.size(this.allItems)
            this.items = this.allItems[this.page - 1] || this.allItems[0]
        },
        changePage(page) {
            this.page = page
            this.$router.push(`${this.$route.path}?page=${page + 1}`)
            this.items = this.allItems[page] || this.allItems[0]
        },
        prevChangePage(page) {
            if (page < 0) {
                return
            }
            this.page = page
            this.$router.push(`${this.$route.path}?page=${page + 1}`)
            this.items = this.allItems[page] || this.allItems[0]
            console.log(this.$route.query.page - 1)
        },
        nextChangePage(page) {
            if (page > this.allItems.length - 1) {
                return
            }
            this.page = page
            this.$router.push(`${this.$route.path}?page=${page + 1}`)
            this.items = this.allItems[page] || this.allItems[0]
        }
    }
}