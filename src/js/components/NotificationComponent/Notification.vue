<template>
    <div class="notification is-success">
        <slot></slot>
    </div>
</template>

<script>
    export default {}
</script>

<style>
    .notification {
        max-width: 400px;
        min-width: 200px;
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>