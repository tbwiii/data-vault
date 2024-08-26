import { Button } from '@/components/ui/button';
import { signIn } from '@lib/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const handleForm = async () => {
    'use server';
    await signIn('google', {
        redirectTo: '/',
    });
}

export default function Login() {
    return (
        <div className="h-screen flex items-center justify-center">
            <Card className='w-96 bg-azure-900'>
                <CardHeader>
                    <CardTitle className='text-azure-300'>Sign in</CardTitle>
                </CardHeader>  
                <CardContent>
                <form
                    action={handleForm}
                    className="w-full"
                >
                    <Button type="submit" className="w-full">Sign in with Google</Button>
                </form>
                </CardContent>
            </Card>
        </div>
    )
}