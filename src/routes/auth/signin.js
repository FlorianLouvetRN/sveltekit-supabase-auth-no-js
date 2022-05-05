import { expressifyResp, deExpressifyResp } from '$lib/express-utils';
import supabase from '$lib/supabase';

const password_recovery = async (request, data) => {
	const password1 = data.get("password1");
	const password2 = data.get("password2");
	const access_token = data.get("access_token");

	if (password1 == password2) {
		const { error } = await supabase.auth.api
			.updateUser(access_token, { password: password1 })
		if (!error) {
			return {
				headers: { Location: '/' },
				status: 302,
			}
		} else {
			return {
				body: { error: error.message },
				status: 400,
			};
		}
	}
	return {
		body: { errro: 'Password are not identical' },
		status: 400,
	};
}

const login = async (request, data) => {
	// Authenticate user
	const { session, error } = await supabase.auth.signIn({
		email: data.get("email"),
		password: data.get("password"),
	});
	console.log(error);
	if (!error) {
		// reditcect to the home page after login
		let response = {
			status: 303,
			headers: {
				location: `/`
			}
		};

		// The following is a "trick" to set the jwt in the response's cookies
		// This allows future requests to be authenticated
		const fake_request = {
			method: "POST",
			headers: {
				host: request.headers.get("host"),
			},
			body: {
				session: session,
				event: 'SIGNED_IN'
			}
		}
		supabase.auth.api.setAuthCookie(fake_request, expressifyResp(response));
		response = deExpressifyResp(response);

		if (request.body.session)
			response.body = { user: request.body.session.user };
		return response;
	}
	return {
		status: 400,
		body: { error: error.message }
	}
}

export async function get() {
	return {
		body: { }
	};
}

export async function post({ request }) {
	const data = await request.formData();
	if (!data.get("type")) return { status: 400, body: { error: "missing type of request" } };
	if (data.get("type") == "recovery") {
		return await password_recovery(data);
	} else if (data.get("type") == "login") {
		let res =  await login(request, data);
		console.log(res);
		return res;
	}
	return { status: 400, body: { error: "invalid type of request" } };
};
