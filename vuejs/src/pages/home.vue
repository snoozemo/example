<template>
    <div>
        <div class="rounded mt-5">
            <p>
                This is pinia count
            </p>
            <p class="mt-3 flex justify-around text-xl">
                <button @click="mainStore.count++">+</button>
                <button @click="mainStore.count--">-</button>
                <button @click="mainStore.$reset">o</button>
            </p>
            <p class="text-center text-3xl mt-3">{{ mainStore.count }}</p>
        </div>

    </div>
</template>
<script setup lang='ts'>
import { useMainStore } from '@/store';
const mainStore = useMainStore()
</script>