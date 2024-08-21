const rootUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';

export default {
    $get: async (slug:string) => {
        try{
            const r = await fetch(`${rootUrl}/api${slug}`).then((res) => res.json());
            return r
        } catch(e){
            console.error(e);
            return null;
        }
    },
    $post: async (dest:string, config:{}) => {
        return await (
            await fetch(`${rootUrl}/api${dest}`,{
                method: "POST",
                cache: 'no-store',
                body: JSON.stringify(config),
            })
        ).json();
    },
    $put: async (dest:string, config:{}) => {
        return await (
            await fetch(`${rootUrl}/api${dest}`,{
                method: "PUT",
                cache: 'no-store',
                body: JSON.stringify(config),
            })
        ).json();
    }
};