<template>
    <div>
        <div class="page-title">
            <h3>Профиль</h3>
        </div>
        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <input
                        v-model="name"
                        id="description"
                        type="text"
                        :class="{invalid: v$.name.$error}"
                >
                <label for="description" :class="{active: name.length}">Имя</label>
                <span
                        class="helper-text invalid" v-if="v$.name.$error">Введите имя
                </span>
            </div>

            <div class="switch">
                <label>
                    English
                    <input type="checkbox" v-model="isRuLocale">
                    <span class="lever"></span>
                    Русский
                </label>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import {required} from "@vuelidate/validators"
    import {mapGetters, mapActions} from 'vuex'
    import useVuelidate from "@vuelidate/core"


    export default {
        name: 'profile',
        setup() {
            return {v$: useVuelidate()}
        },
        data: () => ({
            name: '',
            isRuLocale: true
        }),
        validations: () => ({
            name: {required},
        }),
        mounted() {
            this.isRuLocale = this.info.locale === 'ru-RU'
            this.name = this.info.name
        },
        computed: {
            ...mapGetters(['info'])
        },
        methods:{
            ...mapActions(['updateInfo']),
         async submitHandler(){
              if (this.v$.$invalid) {
                  this.v$.$touch()
                  return
              }
              try {
                  await this.updateInfo({
                      name: this.name,
                      locale: this.isRuLocale ? 'ru-RU': 'en-US'
                  })
                  this.$toast.success(`Имя профиля успешно обновлено`, {
                      position: "top",
                      duration: 4000,
                  });
              }catch (e) {

              }
          }
        },

    }
</script>

<style scoped>
    .switch {
        margin-bottom: 2rem;
    }

</style>