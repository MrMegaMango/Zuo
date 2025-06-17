import { h as head, d as stringify } from "../../../chunks/index2.js";
import { b as base } from "../../../chunks/paths.js";
import { a as attr } from "../../../chunks/attributes.js";
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>About</title>`;
    $$payload2.out += `<meta name="description" content="About this app">`;
  });
  $$payload.out += `<div class="text-column"><h1>About this app</h1> <p>This is a <a href="https://svelte.dev/docs/kit">SvelteKit</a> app. You can make your own by typing
		the following into your command line and following the prompts:</p> <pre>npx sv create</pre> <p>The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.</p> <p>The <a${attr("href", `${stringify(base)}/sverdle`)}>Sverdle</a> page illustrates SvelteKit's data loading and form handling. Try
		using it with JavaScript disabled!</p></div> <footer class="svelte-8o1gnw"><p>built with DeepSeek because AI knows better than reading docs</p></footer>`;
}
export {
  _page as default
};
