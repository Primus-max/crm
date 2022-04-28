<template>
    <ul class="sidenav app-sidenav" :class="{open: isOpen}">
        <router-link
                v-for="link in links"
                :key="link.url"
                active-class="active"
                :to="link.url"
                custom
                v-slot="{ href, route, navigate, isActive, isExactActive }"
        >
            <li :class="[isExactActive && 'active']">
                <a :href="href" @click="navigate" class="waves-effect waves-orange pointer">{{
                    link.title
                    }}</a>
            </li>
        </router-link>
<!--        <li>-->
<!--            <router-link to="/history" class="waves-effect waves-orange pointer">История</router-link>-->
<!--        </li>-->
<!--        <li>-->
<!--            <router-link to="/planning" class="waves-effect waves-orange pointer">Планирование</router-link>-->
<!--        </li>-->
<!--        <li>-->
<!--            <router-link to="/record" class="waves-effect waves-orange pointer">Новая запись</router-link>-->
<!--        </li>-->
<!--        <li>-->
<!--            <router-link to="/categories" class="waves-effect waves-orange pointer">Категории</router-link>-->
<!--        </li>-->
    </ul>
</template>

<script>
    export default {
        props: {
            isOpen: {
                type: Boolean,
                default: true
            }
        },
        data: ()=> ({
            links: [
                {title: 'Счет', url:'/'},
                {title: 'История', url:'/history'},
                {title: 'Планирование', url:'/planning'},
                {title: 'Новая запись', url:'/record'},
                {title: 'Категория', url:'/categories'},
            ]
        })
    }
</script>

<style scoped>

</style>