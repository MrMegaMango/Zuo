import { browser } from '$app/environment';
import { Game } from './game';
import type { PageLoad } from './$types';

export const load = (({ url }) => {
	if (!browser) {
		// Return empty state for SSR
		return {
			guesses: [],
			answers: [],
			answer: null
		};
	}

	// Client-side game state management using localStorage
	const savedGame = localStorage.getItem('sverdle');
	const game = new Game(savedGame);

	return {
		/**
		 * The player's guessed words so far
		 */
		guesses: game.guesses,

		/**
		 * An array of strings like '__x_c' corresponding to the guesses, where 'x' means
		 * an exact match, and 'c' means a close match (right letter, wrong place)
		 */
		answers: game.answers,

		/**
		 * The correct answer, revealed if the game is over
		 */
		answer: game.answers.length >= 6 ? game.answer : null
	};
}) satisfies PageLoad;
