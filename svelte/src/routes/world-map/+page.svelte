<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let animationId: number;
	
	// Places where Zuo has lived/worked - based on resume
	const locations = [
		{ name: 'Mountain View, CA', lat: 37.3861, lng: -122.0839, color: '#FF3E00', description: 'Atlassian - Software Engineer' },
		{ name: 'Shanghai, China', lat: 31.2304, lng: 121.4737, color: '#40B3FF', description: 'Tesla Gigafactory - Senior Software Engineer' },
		{ name: 'Austin, TX', lat: 30.2672, lng: -97.7431, color: '#4ECB71', description: 'Tesla Gigafactory - Senior Software Engineer' },
		{ name: 'London, UK', lat: 51.5074, lng: -0.1278, color: '#FF6B6B', description: 'Samaya AI - Member of Technical Staff' },
		{ name: 'Baltimore, MD', lat: 39.2904, lng: -76.6122, color: '#9B59B6', description: 'Johns Hopkins University - MS Information Security' },
		{ name: 'Rochester, NY', lat: 43.1566, lng: -77.6088, color: '#E67E22', description: 'University of Rochester - BS ECE' }
	];

	let selectedLocation: typeof locations[0] | null = null;
	let rotation = 0;
	let isDragging = false;
	let lastMouseX = 0;

	function degToRad(deg: number): number {
		return (deg * Math.PI) / 180;
	}

	function latLngToXY(lat: number, lng: number, radius: number, rotation: number = 0): { x: number; y: number; z: number } {
		const phi = degToRad(90 - lat);
		const theta = degToRad(lng + rotation);
		
		const x = radius * Math.sin(phi) * Math.cos(theta);
		const y = radius * Math.cos(phi);
		const z = radius * Math.sin(phi) * Math.sin(theta);
		
		return { x, y, z };
	}

	function projectTo2D(x: number, y: number, z: number, centerX: number, centerY: number): { x: number; y: number; visible: boolean } {
		const perspective = 400;
		const distance = 800;
		
		const projectedX = centerX + (x * perspective) / (distance + z);
		const projectedY = centerY - (y * perspective) / (distance + z);
		
		return {
			x: projectedX,
			y: projectedY,
			visible: z > -100
		};
	}

	function drawGlobe() {
		if (!ctx || !canvas) return;
		
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const radius = Math.min(canvas.width, canvas.height) * 0.3;
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// Draw globe background
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = '#1a1a2e';
		ctx.fill();
		ctx.strokeStyle = '#2d2d4d';
		ctx.lineWidth = 2;
		ctx.stroke();
		
		// Draw grid lines
		ctx.strokeStyle = '#3d3d5d';
		ctx.lineWidth = 1;
		
		// Longitude lines
		for (let lng = -180; lng <= 180; lng += 30) {
			ctx.beginPath();
			for (let lat = -90; lat <= 90; lat += 5) {
				const pos = latLngToXY(lat, lng, radius, rotation);
				const projected = projectTo2D(pos.x, pos.y, pos.z, centerX, centerY);
				
				if (projected.visible) {
					if (lat === -90) {
						ctx.moveTo(projected.x, projected.y);
					} else {
						ctx.lineTo(projected.x, projected.y);
					}
				}
			}
			ctx.stroke();
		}
		
		// Latitude lines
		for (let lat = -60; lat <= 60; lat += 30) {
			ctx.beginPath();
			for (let lng = -180; lng <= 180; lng += 5) {
				const pos = latLngToXY(lat, lng, radius, rotation);
				const projected = projectTo2D(pos.x, pos.y, pos.z, centerX, centerY);
				
				if (projected.visible) {
					if (lng === -180) {
						ctx.moveTo(projected.x, projected.y);
					} else {
						ctx.lineTo(projected.x, projected.y);
					}
				}
			}
			ctx.stroke();
		}
		
		// Draw locations
		locations.forEach((location, index) => {
			const pos = latLngToXY(location.lat, location.lng, radius, rotation);
			const projected = projectTo2D(pos.x, pos.y, pos.z, centerX, centerY);
			
			if (projected.visible) {
				// Draw location marker
				ctx.beginPath();
				ctx.arc(projected.x, projected.y, 8, 0, 2 * Math.PI);
				ctx.fillStyle = location.color;
				ctx.fill();
				ctx.strokeStyle = '#ffffff';
				ctx.lineWidth = 2;
				ctx.stroke();
				
				// Draw pulsing effect for selected location
				if (selectedLocation === location) {
					ctx.beginPath();
					const pulseRadius = 8 + Math.sin(Date.now() * 0.01) * 3;
					ctx.arc(projected.x, projected.y, pulseRadius, 0, 2 * Math.PI);
					ctx.strokeStyle = location.color;
					ctx.lineWidth = 3;
					ctx.stroke();
				}
				
				// Draw location label
				ctx.fillStyle = '#ffffff';
				ctx.font = '12px Inter, sans-serif';
				ctx.textAlign = 'center';
				ctx.fillText(location.name, projected.x, projected.y - 15);
			}
		});
	}

	function animate() {
		if (!isDragging) {
			rotation += 0.2;
		}
		drawGlobe();
		animationId = requestAnimationFrame(animate);
	}

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		lastMouseX = event.clientX;
	}

	function handleMouseMove(event: MouseEvent) {
		if (!isDragging) return;
		
		const deltaX = event.clientX - lastMouseX;
		rotation += deltaX * 0.5;
		lastMouseX = event.clientX;
	}

	function handleMouseUp() {
		isDragging = false;
	}

	function handleCanvasClick(event: MouseEvent) {
		if (!canvas) return;
		
		const rect = canvas.getBoundingClientRect();
		const mouseX = event.clientX - rect.left;
		const mouseY = event.clientY - rect.top;
		
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const radius = Math.min(canvas.width, canvas.height) * 0.3;
		
		// Check if click is near any location
		let clickedLocation = null;
		let minDistance = Infinity;
		
		locations.forEach((location) => {
			const pos = latLngToXY(location.lat, location.lng, radius, rotation);
			const projected = projectTo2D(pos.x, pos.y, pos.z, centerX, centerY);
			
			if (projected.visible) {
				const distance = Math.sqrt(
					Math.pow(mouseX - projected.x, 2) + Math.pow(mouseY - projected.y, 2)
				);
				
				if (distance < 20 && distance < minDistance) {
					minDistance = distance;
					clickedLocation = location;
				}
			}
		});
		
		selectedLocation = clickedLocation;
	}

	function resizeCanvas() {
		if (!canvas) return;
		
		const container = canvas.parentElement;
		if (container) {
			canvas.width = container.clientWidth;
			canvas.height = Math.min(container.clientWidth, 500);
		}
		drawGlobe();
	}

	onMount(() => {
		if (browser && canvas) {
			ctx = canvas.getContext('2d')!;
			resizeCanvas();
			animate();
			
			window.addEventListener('resize', resizeCanvas);
			
			return () => {
				if (animationId) {
					cancelAnimationFrame(animationId);
				}
				window.removeEventListener('resize', resizeCanvas);
			};
		}
	});
</script>

<svelte:head>
	<title>World Map - Places I've Lived</title>
	<meta name="description" content="Interactive globe showing places where Zuo has lived and worked" />
</svelte:head>

<div class="world-map-container">
	<header class="header">
		<h1>🌍 Places I've Called Home</h1>
		<p>Click and drag to rotate the globe. Click on markers to learn more about each location.</p>
	</header>

	<div class="globe-container">
		<canvas
			bind:this={canvas}
			on:mousedown={handleMouseDown}
			on:mousemove={handleMouseMove}
			on:mouseup={handleMouseUp}
			on:mouseleave={handleMouseUp}
			on:click={handleCanvasClick}
		></canvas>
	</div>

	{#if selectedLocation}
		<div class="location-info" style="border-left: 4px solid {selectedLocation.color}">
			<h3>{selectedLocation.name}</h3>
			<p>{selectedLocation.description}</p>
		</div>
	{:else}
		<div class="location-info">
			<h3>🗺️ My Journey</h3>
			<p>From Baltimore to London, spanning continents and building amazing technology. Click on any location to learn more!</p>
		</div>
	{/if}

	<div class="legend">
		<h4>Legend</h4>
		<div class="legend-items">
			{#each locations as location}
				<div 
					class="legend-item" 
					on:click={() => selectedLocation = location} 
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							selectedLocation = location;
						}
					}}
					role="button" 
					tabindex="0"
				>
					<div class="legend-dot" style="background-color: {location.color}"></div>
					<span>{location.name}</span>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.world-map-container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 2rem;
		font-family: 'Inter', sans-serif;
	}

	.header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.header h1 {
		color: #2c3e50;
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.header p {
		color: #7f8c8d;
		font-size: 1.1rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.globe-container {
		width: 100%;
		margin: 2rem 0;
		border-radius: 20px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 20px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	canvas {
		display: block;
		border-radius: 15px;
		cursor: grab;
		background: radial-gradient(circle at 30% 30%, #2c3e50, #1a1a2e);
	}

	canvas:active {
		cursor: grabbing;
	}

	.location-info {
		background: white;
		border-radius: 15px;
		padding: 2rem;
		margin: 2rem 0;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}

	.location-info:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}

	.location-info h3 {
		color: #2c3e50;
		margin: 0 0 0.5rem 0;
		font-size: 1.5rem;
	}

	.location-info p {
		color: #7f8c8d;
		margin: 0;
		line-height: 1.6;
		font-size: 1.1rem;
	}

	.legend {
		background: white;
		border-radius: 15px;
		padding: 2rem;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.legend h4 {
		color: #2c3e50;
		margin: 0 0 1rem 0;
		font-size: 1.3rem;
	}

	.legend-items {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.legend-item:hover {
		background: #f8f9fa;
		transform: translateX(5px);
	}

	.legend-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		flex-shrink: 0;
		border: 2px solid white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.legend-item span {
		color: #34495e;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.world-map-container {
			padding: 1rem;
		}

		.header h1 {
			font-size: 2rem;
		}

		.legend-items {
			grid-template-columns: 1fr;
		}
	}

	/* Dark mode styles */
	@media (prefers-color-scheme: dark) {
		.header h1 {
			color: #ecf0f1;
		}

		.header p {
			color: #bdc3c7;
		}

		.location-info {
			background: #2c3e50;
			color: #ecf0f1;
		}

		.location-info h3 {
			color: #ecf0f1;
		}

		.location-info p {
			color: #bdc3c7;
		}

		.legend {
			background: #2c3e50;
		}

		.legend h4 {
			color: #ecf0f1;
		}

		.legend-item:hover {
			background: #34495e;
		}

		.legend-item span {
			color: #ecf0f1;
		}
	}
</style>