export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "app/_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BoMvzP2k.js",app:"_app/immutable/entry/app.JdazEWy2.js",imports:["_app/immutable/entry/start.BoMvzP2k.js","_app/immutable/chunks/BVkMZSLs.js","_app/immutable/chunks/Bjg-io6C.js","_app/immutable/chunks/CzU6saBn.js","_app/immutable/chunks/BUInn1rb.js","_app/immutable/entry/app.JdazEWy2.js","_app/immutable/chunks/Cijui7Gs.js","_app/immutable/chunks/Bjg-io6C.js","_app/immutable/chunks/Cek7kktL.js","_app/immutable/chunks/RBUSPonE.js","_app/immutable/chunks/kCkrrChK.js","_app/immutable/chunks/D_az2xaA.js","_app/immutable/chunks/D12ryn3u.js","_app/immutable/chunks/BUInn1rb.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/sverdle",
				pattern: /^\/sverdle\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set(["/app/","/app/about","/app/sverdle/how-to-play"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
