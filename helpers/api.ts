export default {
    $post: async (dest:string, config:{}) => {
        return await (
            await fetch(`${process.env.API_URL}${dest}`,{
                method: "POST",
                cache: 'no-store',
                body: JSON.stringify(config),
            })
        ).json();
    }
};