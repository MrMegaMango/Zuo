import * as server from '../entries/pages/sverdle/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sverdle/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/sverdle/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.Bx82hpCS.js","_app/immutable/chunks/D_az2xaA.js","_app/immutable/chunks/Bjg-io6C.js","_app/immutable/chunks/Cek7kktL.js","_app/immutable/chunks/RBUSPonE.js","_app/immutable/chunks/kCkrrChK.js","_app/immutable/chunks/D12ryn3u.js","_app/immutable/chunks/BUMu5nGm.js","_app/immutable/chunks/ueSiljrZ.js","_app/immutable/chunks/BVkMZSLs.js","_app/immutable/chunks/CzU6saBn.js","_app/immutable/chunks/BUInn1rb.js"];
export const stylesheets = ["_app/immutable/assets/4.yeGN9jlM.css"];
export const fonts = [];
