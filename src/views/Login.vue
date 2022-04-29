<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>
            <div class="input-field">
                <input
                        id="email"
                        type="text"
                        v-model="email"
                        :class="{invalid: v$.email.$error}"
                >
                <label for="email">Email</label>
                <small class="helper-text invalid"
                       v-for="(error, index) of v$.email.$errors">
                    {{ printError(error.$validator, error.$params) }}
                </small>
            </div>
            <div class="input-field">
                <input
                        id="password"
                        type="password"
                        v-model="password"
                        :class="{invalid: v$.password.$error}"
                >
                <label for="password">Пароль</label>
                <small class="helper-text invalid"
                       v-for="(error, index) of v$.password.$errors"
                >
                    {{ printError(error.$validator, error.$params) }}
                </small>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    Войти
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Нет аккаунта?
                <router-link to="/register">Зарегистрироваться</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import useVuelidate from '@vuelidate/core'
    import {required, minLength, email} from '@vuelidate/validators'

    export default {
        name: 'Login',
        setup() {
            return {v$: useVuelidate()}
        },
        data: () => ({
            email: '',
            password: '',
        }),
        validations: () => ({
            email: {email, required},
            password: {required, minLength: minLength(6)}
        }),
        methods: {
            showToast() {
                this.$toast.show("Email Sent!", {
                    position: "top-right",
                    duration: 50000,
                });

            },
            async submitHandler() {
                this.v$.$touch()
                if (this.v$.$error) return

                const formData = {
                    email: this.email,
                    password: this.password
                }

                try {
                    await this.$store.dispatch('login', formData);
                    this.$router.push('/');
                } catch (e) {
                    this.$toast.error("Вы не авторизовались!", {
                        position: "top-right",
                        duration: 3000,
                    });
                }
            },
            compute() {

            },

            printError($name, $param) {
                console.log($name)
                // console.log($param)
                if ($name === 'required') {
                    return 'Поле не должно быть пустым'
                } else if ($name === 'minLength') {
                    console.log($param)
                    return `Минимальная длина должна быть ${$param.min} символов, сейчас он ${this.password.length}`
                } else if ($name === 'email') {
                    return 'Почта указана не полностью, проверьте'
                }
            }
        }
    }
</script>

<style scoped>
    .toasting {
        color: yellow;
        background-color: pink;
    }
</style>