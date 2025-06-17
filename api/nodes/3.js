import * as universal from '../entries/pages/about/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/about/+page.ts";
export const imports = ["_app/immutable/nodes/3.BEWB8ItP.js","_app/immutable/chunks/CD7l7fTx.js","_app/immutable/chunks/Bjg-io6C.js","_app/immutable/chunks/D_az2xaA.js","_app/immutable/chunks/BIXfG3nm.js","_app/immutable/chunks/kCkrrChK.js","_app/immutable/chunks/ueSiljrZ.js","_app/immutable/chunks/CzU6saBn.js"];
export const stylesheets = [];
export const fonts = [];
