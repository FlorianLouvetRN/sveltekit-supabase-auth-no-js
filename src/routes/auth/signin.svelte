<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { on_submit_action } from '$lib/on_submit';

	/**
	 * @type {string|null}
	 */
	export let error = null;

	let password_recovery = false;
	/**
	 * @type {string|null}
	 */
	let access_token = null;

	const hash = $page.url.hash.substring(1);
	for (const hash_param of hash.split('&')) {
		const [key, value] = hash_param.split('=');
		if (key == 'type' && (value == 'recovery' || value == 'invite')) password_recovery = true;
		if (key == 'access_token') access_token = value;
	}
</script>

<div class="flex flex-col items-center">
	<div class="max-w-lg px-4 w-full flex flex-col items-center">
		<h1 class="text-primary text-2xl my-4">{password_recovery ? 'Password recovery' : 'Login'}</h1>
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
		{#if password_recovery}
			<form method="post" class="w-full">
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-password1"
						>
							Password
						</label>
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-password1"
							type="password"
							placeholder="******************"
							name="password1"
						/>
					</div>
				</div>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-password2"
						>
							Confirm password
						</label>
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-password2"
							type="password"
							placeholder="******************"
							name="password2"
						/>
					</div>
				</div>
				<input type="hidden" value="recovery" name="type" />
				<input type="hidden" value={access_token} name="access_token" />
				<div class="flex justify-end">
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1 md:flex-initial"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		{:else}
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
						Submit
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>
