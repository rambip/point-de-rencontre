<script>
    import {createEventDispatcher, setContext} from 'svelte';
    import L from 'leaflet';

    export let options = {};
    export let onClick;

    let map = null;

    setContext(L, {
        getMap: () => map,
    });

    const dispatch = createEventDispatcher();
    let eventBridge;

    function initialize(container) {
        map = L.map(container, options);
        map.on('click', onClick)
    }

    export function getMap() {
        return map;
    }
</script>

<div style="height:100%; width:100%;" use:initialize>
    {#if map}
        <slot/>
    {/if}
</div>
