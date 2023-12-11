<template>
    <Head>
        <Title>Gallery</Title>
        <Link rel="icon" href="/icon.png" type="image/png" />
        <Meta name="description" content="An image gallery built with Nuxt 3" />
    </Head>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
useHead({
    htmlAttrs: {
        lang: "en",
    },
});
</script>

<style>
.layout-enter-active,
.layout-leave-active {
    transition: all 350ms;
}
.layout-enter-from,
.layout-leave-to {
    filter: grayscale(0.5);
    opacity: 0;
    filter: blur(1rem);
}
</style>
