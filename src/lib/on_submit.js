export function on_submit_action(form, { action, pending, error, result }) {
	let current_token;

	async function handle_submit(e) {
		const token = (current_token = {});

		e.preventDefault();

		const data = Object.fromEntries(new FormData(form).entries());

		if (pending) pending({ data, form });

		try {
			if (action) {
				const res = await action({ data });

				if (token !== current_token) return;

				if (res.ok) {
					result({ res, form });
				} else if (error) {
					error({ res, event: null, form });
				} else {
					console.error(await res.text());
				}
			}
		} catch (e) {
			if (error) {
				error({ res: null, event: e, form });
			} else {
				throw e;
			}
		}
	}

	form.addEventListener('submit', handle_submit);

	return {
		destroy() {
			form.removeEventListener('submit', handle_submit);
		},
	};
}
