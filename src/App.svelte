<script>
    import {onMount} from 'svelte';
    import Marker from './lib/Marker.svelte'
    import Icon from './lib/Icon.svelte'
    import MapPicker from './lib/MapPicker.svelte'

    import geometricMedian from './lib/geometry.js'

    import Openrouteservice from 'openrouteservice-js'
    let orsDirections = new Openrouteservice.Directions(
    { api_key: "5b3ce3597851110001cf624821fcb05608ba4d1e8b9aa9885cf8b3c4"}
    );

    let meeting_points = [];

    let middle_point = null;
    const p0 = [47.08583739311312, 2.3957204622241997];

    async function compute() {
        middle_point = await geometricMedian(orsDirections, p0, meeting_points)
    }


</script>

<div class="container">
    <div class="map">
        <MapPicker bind:points={meeting_points} {middle_point} origin={p0}/>
    </div>
    <span>clique sur la carte pour choisir des points.<br>Clique une seconde fois pour les supprimer</span>
    <button on:click={compute}>calculer</button>
</div>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.map{
    width: 1000px;
    height: 600px;
}

button {
    padding: 10px 30px;
}

</style>
