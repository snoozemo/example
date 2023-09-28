<template>
    <div class="w-screen h-screen font-mono bg-slate-400 overflow-hidden">
        <div class="w-48 mt-10 mx-auto">
            <h1 class="text-2xl text-center font-bold">DEMO OF VUE</h1>
            <div class="mt-5 flex justify-between">
                <router-link class="transition-all hover:underline" to="/">Home</router-link>
                <router-link class="transition-all hover:underline" to="/about">About</router-link>
            </div>



            <router-view class="mt-10" v-slot="{ Component }">
                <transition name="bounce" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>

        </div>

    </div>
</template>
<script setup lang='ts'>
</script>
<style>
.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0.5);
        opacity: 0;
    }

    50% {
        transform: scale(1.05);
        opacity: .9;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>