import { SignIn } from '@clerk/nextjs';
import { Layout } from '@/components/layout/Layout';

export default function SignInPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-graphite">
              Sign in to Admin Dashboard
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access the admin dashboard to manage content and settings
            </p>
          </div>
          <div className="flex justify-center">
            <SignIn 
              afterSignInUrl="/admin"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-primary-500 hover:bg-primary-600 text-white",
                  card: "shadow-lg",
                },
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}