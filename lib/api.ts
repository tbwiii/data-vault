import { wrap } from 'module';

const rootUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';

export default {
    $get: (slug:string) => {
        try{
            return fetch(`${rootUrl}/api${slug}`,{ cache: 'no-store'});
        } catch(e){
            console.error(e);
            return e;
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
    },
    $delete: async (dest:string, config:{}) => {
        return await (
            await fetch(`${rootUrl}/api${dest}`,{
                method: "DELETE",
                cache: 'no-store',
                body: JSON.stringify(config),
            })
        ).json();
    }
};