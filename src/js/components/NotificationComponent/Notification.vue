<template>
    <div class="notification is-success">
        <slot></slot>
    </div>
</template>

<style>
    .notification {
        max-width: 400px;
        min-width: 200px;
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        width: auto;
        max-width: 300px;
        margin: auto;
        box-shadow: -3px 2px 4px rgba(0, 0, 0, .2), 3px 2px 4px rgba(0, 0, 0, .2);
        z-index: 1000000;
    }
</style>