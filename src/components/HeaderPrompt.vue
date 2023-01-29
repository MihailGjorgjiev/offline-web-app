<template>
        <div  class="pwa-prompt">
            <h2>Offline First Notepad App</h2>
        </div>
</template>


<script>
export default {
}
</script>


<style scoped>

.pwa-prompt {
    position: fixed;
    font-size: 1.25rem;
    z-index: 20;
    line-height: 1;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 6rem;
    background: #38c790;
    color: white;
    transform: translateY(0);
    margin: 0;
}
.pwa-prompt   .install-button {
        font-size: inherit;
        margin: 0 0 0 0.5rem;
        padding: 0.25em 0.5em;
        background-color: var(--bright);
        border: 0;
        border-radius: 4px;
        line-height: 1;
        text-transform: uppercase;
        font-weight: 600;
    }

    .pwa-prompt   .close-button {
        position: absolute;
        right: 0;
        top: -.25rem;
        font-size: 3rem;
        background: transparent;
        border: 0;
        padding: 0 0.75rem;
        height: 100%;
        line-height: 1;
    }


    .pwa-prompt .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        left: -100vw;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }


.fade-up-in-enter-active,
.fade-up-in-leave-active {
    transition: opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1), transform 1s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform: translateY(0);
}

.fade-up-in-enter,
.fade-up-in-leave-to {
    opacity: 0;
    transform: translateY(4rem);
}
</style>