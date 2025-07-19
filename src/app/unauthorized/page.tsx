import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <Shield className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-6 text-3xl font-extrabold text-graphite">
              Access Denied
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You don&apos;t have permission to access the admin dashboard. Please contact the site administrator if you believe this is an error.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <p className="text-xs text-gray-500">
              If you need admin access, please contact the site administrator.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}