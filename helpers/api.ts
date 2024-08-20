export default {
    $post: async (dest:string, config:{}) => {
        return await (
            await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api${dest}`,{
                method: "POST",
                cache: 'no-store',
                body: JSON.stringify(config),
            })
        ).json();
    }
};