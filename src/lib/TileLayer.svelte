<script>
    import {createEventDispatcher, getContext, onDestroy} from 'svelte';
    import L from 'leaflet';


    const {getMap} = getContext(L);

    export let url;
    export let wms = false;
    export let opacity = 1.0;
    export let zIndex = 1;
    export let options = {};

    let tileLayer;

    const dispatch = createEventDispatcher();

    $: {
        if (!tileLayer) {
            tileLayer = (!wms ? L.tileLayer(url, options) : L.tileLayer.wms(url, options)).addTo(getMap());
        }
        tileLayer.setUrl(url);
        tileLayer.setOpacity(opacity);
        tileLayer.setZIndex(zIndex);
    }

    onDestroy(() => {
        tileLayer.removeFrom(getMap());
    });

    export function getTileLayer() {
        return tileLayer;
    }
</script>
