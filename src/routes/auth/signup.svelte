<script context="module">
	export const prerender = true;
</script>

<script>
	export /**
	 * @type {null|string}
	 */
	let error = null;
	let signed_up = false;
</script>

<div class="flex flex-col items-center">
	<div class="max-w-lg px-4 w-full flex flex-col items-center">
		{#if error}
			<div class="flex flex-row items-center rounded bg-red-200 my-4 p-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="w-6 h-6 mx-2 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
					/>
				</svg>
				<p>{error}</p>
			</div>
		{/if}
		{#if !signed_up}
			<h1 class="text-primary text-2xl my-4">Create an account</h1>
			<form method="post" class="w-full">
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="flex-1 px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-email"
						>
							Email
						</label>
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-email"
							type="text"
							placeholder="mike@mymail.com"
							name="email"
						/>
					</div>
				</div>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-password"
						>
							Password
						</label>
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-password"
							type="password"
							placeholder="******************"
							name="password"
						/>
					</div>
				</div>
				<input type="hidden" value="login" name="type" />
				<div class="flex justify-end">
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1 md:flex-initial"
						type="submit"
					>
						Create
					</button>
				</div>
			</form>
		{:else}
			<p>You have been signed up check your mails</p>
		{/if}
	</div>
</div>
