import supabase from '$lib/supabase';

export async function post({ request }) {
    const data = await request.formData();

    // Sign up user
    const { error } = await supabase.auth.signUp({ email: data.get("email"), password: data.get("password") });
    // Signing up 
    if (!error) {
        return {
            status: 200,
            body: { signup_success: true }
        }
    } else {
        return {
            status: 400,
            body: { error: error.message }
        }
    }
};
