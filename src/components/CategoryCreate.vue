<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Создать</h4>
            </div>

            <form @submit.prevent="submitHandler">
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
                    Создать
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, minValue} from '@vuelidate/validators'
    import useVuelidate from '@vuelidate/core'
    //import useVuelidate, {BaseValidation as v$} from "@vuelidate/core"

    export default {
        name: 'CategoryCreate',
        setup() {
            return {v$: useVuelidate()}
        },
        data: () => ({
            title: '',
            limit: 100
        }),
        validations: () => ({
            title: {required},
            limit: {minValue: minValue(100)}
        }),
        mounted() {
            M.updateTextFields()
        },
        methods: {
            async submitHandler() {
                if (this.v$.$invalid) {
                    this.v$.$touch()
                    return
                }
                try {
                    const category = await this.$store.dispatch('createCategory', {
                        title: this.title,
                        limit: this.limit
                    })
                    this.title = ''
                    this.limit = 100
                    this.v$.$reset()
                    this.$toast.success(`Вы успешно создали категорию: ${category.title}`, {
                        position: "top",
                        duration: 3000,
                    });
                    this.$emit('create', category)
                } catch (e) {

                }

            }
        },
    }
</script>

<style scoped>

</style>