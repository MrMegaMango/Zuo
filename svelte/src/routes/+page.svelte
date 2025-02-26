<script lang="ts">
	import { Spring } from 'svelte/motion';
	import Counter from './Counter.svelte';
	import { base } from '$app/paths';

	const colors = ['#FF3E00', '#40B3FF', '#676778', '#FF6B6B', '#4ECB71'];
	let tiles = Array(25).fill(null).map((_, i) => ({
		id: i,
		color: colors[Math.floor(Math.random() * colors.length)],
		scale: 1
	}));

	const spring = new Spring({ stiffness: 0.1, damping: 0.6 });

	function handleTileClick(index: number) {
		tiles[index].scale = 0.8;
		setTimeout(() => {
			tiles[index].scale = 1;
		}, 150);
	}

	function handleTileHover(index: number) {
		tiles[index].scale = 1.1;
	}

	function handleTileLeave(index: number) {
		tiles[index].scale = 1;
	}
</script>

<svelte:head>
	<title>Interactive Grid</title>
	<meta name="description" content="Interactive grid demo with Svelte" />
</svelte:head>

<section>
	<h1>Mango's Interactive Grid</h1>
	
	<div class="grid">
		{#each tiles as tile, i}
			<button
				type="button"
				class="tile"
				style="background-color: {tile.color}; transform: scale({tile.scale})"
				on:click={() => handleTileClick(i)}
				on:mouseenter={() => handleTileHover(i)}
				on:mouseleave={() => handleTileLeave(i)}
				on:keydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						handleTileClick(i);
					}
				}}
				aria-label={`Interactive tile ${i + 1}`}
			></button>
		{/each}
	</div>

	<div class="counter-section">
		<h2>Try the counter below</h2>
		<Counter />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		gap: 2rem;
	}

	h1 {
		color: #FF3E00;
		font-size: 2.5rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.5rem;
		max-width: 500px;
		width: 100%;
		margin: 0 auto;
	}

	.tile {
		aspect-ratio: 1;
		border-radius: 8px;
		border: none;
		padding: 0;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	.tile:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.counter-section {
		margin-top: 2rem;
		text-align: center;
	}

	h2 {
		color: #676778;
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	@media (max-width: 600px) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (max-width: 400px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
