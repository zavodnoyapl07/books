<template>
    <div id="app">
        <div class="header">
            <div class="header__info">
                <div class="header__info-label header__info-item">
                    <router-link :to="{ name: 'list'}">Книги</router-link>
                </div>
                <div class="header__info-menu header__info-item">
                    <router-link :to="{ name: 'add_book'}">Добавить книгу</router-link>
                </div>
            </div>
        </div>
        <div class="container">
            <div v-if="isLoaded" class="container__content">
                <router-view />
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>
<script>
export default {
    name: 'App',
    data: function () {
        return {
            isLoaded: false,
        }
    },
    created: function () {
        this.$store.dispatch('init')
        this.isLoaded = true
    },
}
</script>
<style lang="less">
  @import './assets/style/main.less';
</style>
