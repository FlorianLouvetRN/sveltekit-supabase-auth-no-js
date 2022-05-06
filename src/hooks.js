import * as cookie from 'cookie';
import supabase from '$lib/supabase';


/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
	if (!event.locals) return {};
	return event.locals.user ? {
		user: event.locals.user,
	} : {};
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	const request = event.request;
	const cookies = cookie.parse(request.headers.get('cookie') || '');
	const jwt = cookies['sb-access-token'];
	if (jwt) {
		supabase.auth.setAuth(jwt);
		const { user } = await supabase.auth.api.getUserByCookie({ cookies });
		event.locals.user = user;
	}

	const response = await resolve(event);
	return response;
};

