"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth, useUser } from "@clerk/nextjs";
import { Shield, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminTestPage() {
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ensure we're on the client side and auth is loaded
  if (!isClient || !authLoaded || !userLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#43abc3]" />
      </div>
    );
  }

  const isAdmin =
    user?.emailAddresses?.[0]?.emailAddress === "admin@boles.com" ||
    user?.emailAddresses?.[0]?.emailAddress?.includes("admin") ||
    user?.publicMetadata?.role === "admin";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Access Test</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Signed In:</span>
                  <span
                    className={`ml-2 ${isSignedIn ? "text-green-600" : "text-red-600"}`}
                  >
                    {isSignedIn ? "✅ Yes" : "❌ No"}
                  </span>
                </div>

                <div>
                  <span className="font-medium">Admin Access:</span>
                  <span
                    className={`ml-2 ${isAdmin ? "text-green-600" : "text-red-600"}`}
                  >
                    {isAdmin ? "✅ Yes" : "❌ No"}
                  </span>
                </div>

                {user && (
                  <>
                    <div>
                      <span className="font-medium">Name:</span>
                      <span className="ml-2 text-gray-900">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>

                    <div>
                      <span className="font-medium">Email:</span>
                      <span className="ml-2 text-gray-900">
                        {user.emailAddresses?.[0]?.emailAddress}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Access Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Email is "admin@boles.com"</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Email contains "admin"</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>User metadata role is "admin"</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {!isSignedIn ? (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium text-red-800">
                        Sign In Required
                      </p>
                      <p className="text-sm text-red-600">
                        Please sign in to test admin access
                      </p>
                    </div>
                  </div>
                  <Link href="/auth/signin">
                    <Button className="mt-4 bg-red-600 hover:bg-red-700">
                      Sign In
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : isAdmin ? (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">
                        Admin Access Granted!
                      </p>
                      <p className="text-sm text-green-600">
                        You can access the admin panel
                      </p>
                    </div>
                  </div>
                  <Link href="/admin">
                    <Button className="mt-4 bg-green-600 hover:bg-green-700">
                      Access Admin Panel
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-orange-800">
                        Regular User Access
                      </p>
                      <p className="text-sm text-orange-600">
                        You're signed in but don't have admin privileges
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-x-3">
                    <Link href="/">
                      <Button
                        variant="outline"
                        className="border-orange-300 text-orange-700"
                      >
                        Go to Store
                      </Button>
                    </Link>
                    <Link href="/admin">
                      <Button className="bg-orange-600 hover:bg-orange-700">
                        Try Admin Panel
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Home Page
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button variant="outline" className="w-full">
                    Admin Panel
                  </Button>
                </Link>
                <Link href="/test-auth">
                  <Button variant="outline" className="w-full">
                    Auth Debug
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
