<script setup lang="ts" >
import type { LatLng, LatLngBounds, LatLngTuple } from 'leaflet';
import { ref } from 'vue';
import { VMap, VMapOsmTileLayer, VMapZoomControl } from 'vue-map-ui';
 
const center = ref<LatLngTuple | LatLng>([11.562108, 104.888535]);
const zoom = ref(12);
const bounds = ref<LatLngBounds | null>(null);

const onViewChanged = (view: { center: LatLng; zoom: number; bounds: LatLngBounds }) => {
  center.value = view.center;
  zoom.value = view.zoom;
  bounds.value = view.bounds;
}
</script>

<template>
 <VMap :center="center" :zoom="zoom" @view-changed="onViewChanged" class="rounded-2xl" style="height: 500px;">
    <VMapLayersControl position="topleft">
      <VMapOsmTileLayer />
      <VMapZoomControl position="topright" />
       <VMapMarker :latlng="[11.5588561, 104.8782788]" />
      <VMapScaleControl />
      <VMapArcGisTileLayer />
      <VMapArcGisAeroTileLayer />
      <VMapGoogleTileLayer title="Google Streets" />
      <VMapGoogleTileLayer title="Google Hybrid" type="hybrid" />
      <VMapGoogleTileLayer title="Google Terrain" type="terrain" />
      <VMapGoogleTileLayer title="Google Satellite" type="satellite" />
    </VMapLayersControl>
  </VMap>
</template>