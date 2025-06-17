import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.BPUoMyg1.js","_app/immutable/chunks/D_az2xaA.js","_app/immutable/chunks/Bjg-io6C.js","_app/immutable/chunks/BIXfG3nm.js","_app/immutable/chunks/RBUSPonE.js","_app/immutable/chunks/kCkrrChK.js","_app/immutable/chunks/BUMu5nGm.js","_app/immutable/chunks/ueSiljrZ.js","_app/immutable/chunks/BMw4qkQT.js","_app/immutable/chunks/Cek7kktL.js","_app/immutable/chunks/CzU6saBn.js"];
export const stylesheets = ["_app/immutable/assets/2.CzvpgeRb.css"];
export const fonts = [];
