<script>
    import LeafletMap from '$lib/LeafletMap.svelte'
    import Marker from '$lib/Marker.svelte'
    import Polyline from '$lib/Polyline.svelte'
    import TileLayer from '$lib/TileLayer.svelte'
    import Icon from '$lib/Icon.svelte'

    import iconUrl from '$assets/marker.png'

    export let points = [];
    export let middle_point = null;

    export let origin;

    const mapOptions = {
        center: origin,
        zoom: 6,
    };

    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };

    function addMeetingPoint(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        points = [...points, [lat, lng]]
    }
    function removeMeetingPoint(e, p) {
        points = points.filter(x => x!==p);
    }
    const iconOptions = {
        iconUrl: iconUrl,
        iconSize: [41, 41],
        iconAnchor: [20, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16. -28],
    };
</script>


<LeafletMap options={mapOptions} onClick={addMeetingPoint}>
    <TileLayer url={tileUrl} options={tileLayerOptions}/>
    {#each points as p (p)}
        <Marker latLng={p} onClick={e=>removeMeetingPoint(e, p)}/>
    {/each}
    {#if middle_point !== null}
        <Marker latLng={middle_point}>
            <Icon options={iconOptions}/>
        </Marker>
    {/if}
</LeafletMap>
