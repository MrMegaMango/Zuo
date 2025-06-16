<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { children } = $props();

	onMount(async () => {
		if (browser) {
			const { inject } = await import('@vercel/analytics');
			inject();
		}
	});

	function goToHome() {
		goto('/', { replaceState: true });
	}
</script>

<div class="app">
	<Header />
	<button class="back-button" onclick={goToHome}>← Back to Zuo's landing page</button>

	<main>
		{@render children()}
	</main>

	<footer>
		<p>
			built with DeepSeek because AI knows better than reading docs
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	.back-button {
		position: fixed;
		top: 4rem;
		left: 1rem;
		padding: 0.5rem 1rem;
		background-color: #4a5568;
		color: white;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
		font-size: 0.875rem;
		transition: background-color 0.2s;
		z-index: 1000;
	}

	.back-button:hover {
		background-color: #2d3748;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
