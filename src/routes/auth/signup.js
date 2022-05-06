import supabase from '$lib/supabase';

export async function post({ request }) {
    const data = await request.formData();

    // Sign up user
    const { error } = await supabase.auth.signUp({ email: data.get("email"), password: data.get("password") });
    if (!error) {
        return {
            status: 200,
            body: { error: "success" }
        }
    } else {
        return {
            status: 400,
            body: { error: error.message }
        }
    }
};
