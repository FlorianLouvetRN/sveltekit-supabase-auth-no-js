<script context="module" lang="ts">
	const publicPages = ['/signin'];
	export async function load({ url, session }) {
		if (!session.user) {
			if (publicPages.includes(url.pathname)) {
				return {};
			}
			return { status: 302, redirect: '/signin' };
		}
		return {};
	}
</script>

<script>
	import '../app.css';
</script>

<div class="flex flex-col h-screen w-full">
	<slot />
</div>
