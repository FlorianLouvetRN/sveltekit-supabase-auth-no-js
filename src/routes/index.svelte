<script>
	import { session } from '$app/stores';
</script>

{#if $session.user}
	<div class="flex-none">
		<form method="post" action="/auth/signout" class="m-0 p-0 inline-flex">
			<button type="submit" class="inline-flex px-3">
				Sign out
			</button>
		</form>
	</div>
{/if}

<div class="fixed bottom-4 right-4">
	<ul class="menu shadow-lg bg-primary rounded-box horizontal">
		<li>
			<a href="/add">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4v16m8-8H4"
					/>
				</svg>
			</a>
		</li>
	</ul>
</div>
