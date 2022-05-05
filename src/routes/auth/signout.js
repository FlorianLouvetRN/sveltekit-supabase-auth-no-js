import { expressifyResp, deExpressifyResp } from '$lib/express-utils';
import supabase from '$lib/supabase';

export const post = async ({ request }) => {
	const fake_request = {
		method: "POST",
		headers: {
			host: request.headers.get("host"),
		},
		body: {
			session: null,
			event: 'SIGNED_OUT'
		}
	}
	let response = {
		headers: { Location: '/' },
		status: 302,
		body: {},
	};
	supabase.auth.api.setAuthCookie(fake_request, expressifyResp(response));
	response = deExpressifyResp(response);
	return response;
};
