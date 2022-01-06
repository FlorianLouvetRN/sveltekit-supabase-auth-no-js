import { expressifyResp, deExpressifyResp } from '$lib/express-utils';
import supabase from '$lib/supabase';

export const post = async (request) => {
	request.body = {
		event: 'SIGNED_OUT',
		session: null,
	};
	let response = {
		headers: { Location: '/' },
		status: 302,
		body: {},
	};
	supabase.auth.api.setAuthCookie(request, expressifyResp(response));
	response = deExpressifyResp(response);
	return response;
};
