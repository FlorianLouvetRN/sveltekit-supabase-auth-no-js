import { expressifyResp, deExpressifyResp } from '$lib/express-utils';
import supabase from '$lib/supabase';

export const post = async (request) => {
	// Authenticate user
	const { session, error } = await supabase.auth.signIn({
		email: request.body.get('email'),
		password: request.body.get('password'),
	});
	if (!error) {
		// reditcect to the home page after login
		let response = {
			headers: { Location: '/' },
			status: 302,
			body: {},
		};

		// The following is a "trick" to set the jwt in the response's cookies
		// This allows future requests to be authenticated
		request.body = {
			event: 'SIGNED_IN',
			session: session,
		};
		supabase.auth.api.setAuthCookie(request, expressifyResp(response));
		response = deExpressifyResp(response);

		if (request.body.session)
			response.body = { user: request.body.session.user };
		return response;
	}
	// if authentication is not successfull we redirect to signin
	// with the error message
	return {
		headers: { Location: `/signin?error=${encodeURIComponent(error.message)}` },
		status: 302,
	};
};
