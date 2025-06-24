<script lang="ts">
	import { onMount } from 'svelte';
	
	let mounted = false;
	
	const locations = [
		{ name: 'London, UK', lat: 51.5074, lng: -0.1278, color: '#FF6B6B', description: 'Samaya AI - Current' },
		{ name: 'Austin, TX', lat: 30.2672, lng: -97.7431, color: '#4ECB71', description: 'Tesla Gigafactory' },
		{ name: 'Shanghai, China', lat: 31.2304, lng: 121.4737, color: '#40B3FF', description: 'Tesla Gigafactory' }
	];
	
	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Test Globe</title>
</svelte:head>

<div class="container">
	<h1>🌍 Simple Globe Test</h1>
	
	{#if mounted}
		<p>✅ Component mounted successfully!</p>
		
		<div class="locations">
			<h2>Locations:</h2>
			{#each locations as location}
				<div class="location-card" style="border-left: 4px solid {location.color}">
					<h3>{location.name}</h3>
					<p>{location.description}</p>
					<small>Lat: {location.lat}, Lng: {location.lng}</small>
				</div>
			{/each}
		</div>
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		font-family: 'Inter', sans-serif;
	}
	
	h1 {
		color: #2c3e50;
		text-align: center;
		margin-bottom: 2rem;
	}
	
	.locations {
		display: grid;
		gap: 1rem;
		margin-top: 2rem;
	}
	
	.location-card {
		background: white;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	}
	
	.location-card h3 {
		margin: 0 0 0.5rem 0;
		color: #2c3e50;
	}
	
	.location-card p {
		margin: 0 0 0.5rem 0;
		color: #7f8c8d;
	}
	
	.location-card small {
		color: #95a5a6;
	}
</style>