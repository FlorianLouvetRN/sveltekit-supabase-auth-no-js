import supabase from '$lib/supabase';

export const post = async (request) => {
    const password1 = request.body.get('password1');
    const password2 = request.body.get('password2');
    const access_token = request.body.get('access_token');

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
                headers: { Location: `/signin?error=${encodeURIComponent(error.message)}&type=recovery&access_token=${access_token}` },
                status: 302,
            };
        }
    }
    return {
        headers: { Location: `/signin?error=${encodeURIComponent('Password are not identical')}&type=recovery&access_token=${access_token}` },
        status: 302,
    };
};
