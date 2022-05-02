<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Редактировать</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <select ref="select" v-model="current">
                        <option
                                v-for="c of categories"
                                :key="c.id"
                                :value="c.id"
                        >{{c.title}}
                        </option>
                    </select>
                    <label>Выберите категорию</label>
                </div>
                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model="title"
                            :class="{invalid: v$.title.$error}"

                    >
                    <label for="name">Название</label>
                    <span
                            v-if="v$.title.$error"
                            class="helper-text invalid"


                    >
                       Введите навзвание категории
                    </span>
                </div>


                <div class="input-field">
                    <input
                            id="limit"
                            type="number"
                            v-model.number="limit"
                            :class="{invalid: v$.limit.$error}"
                    >
                    <label for="limit">Лимит</label>
                    <span
                            v-if="v$.limit.$error"
                            class="helper-text invalid"

                    >
                        Минимальное занчение {{ v$.limit.minValue.$params.min }}
                    </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    Обновить
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import useVuelidate from "@vuelidate/core";
    import {minValue, required} from "@vuelidate/validators";

    export default {
        name: 'CategoryEdit',
        props: {
            categories: {
                type: Array,
                required: true
            }
        },
        setup() {
            return {v$: useVuelidate()}
        },
        data: () => ({
            select: null,
            title: '',
            limit: 100,
            current: null
        }),
        validations: () => ({
            title: {required},
            limit: {minValue: minValue(100)}
        }),
        mounted() {
            this.select = M.FormSelect.init(this.$refs.select)
            M.updateTextFields()
        },
        methods: {
            // updateSelectField() {
            //     this.$nextTick( () => {
            //         this.select.destroy();
            //         this.select = M.FormSelect.init(this.$refs.select);
            //     })
            // },
            async submitHandler() {
                if (this.v$.$invalid) {
                    this.v$.$touch()
                    return
                }
                try {
                    const categoryData = {
                        id: this.current,
                        title: this.title,
                        limit: this.limit
                    }
                    await this.$store.dispatch('updateCategory', categoryData)
                    this.$emit('updated', categoryData)
                    // this.updateSelectField()
                    this.$toast.success(`Вы успешно обновили категорию`, {
                        position: "top",
                        duration: 3000,
                    });

                } catch (e) {

                }
            }
        },
        watch: {
            current(catId) {
                const {title, limit} = this.categories.find(c => c.id === catId)
                this.title = title
                this.limit = limit
            },
            // categories() {
            //     this.updateSelectField(); // При добавлении новой категории
            // }
        },
        created() {
            const {id, title, limit} = this.categories[0]
            this.current = id
            this.title = title
            this.limit = limit
        },
        unmounted() {
            if (this.select && this.select.unmount) {
                this.select.unmount()
            }
        }
    }
</script>

<style scoped>

</style>