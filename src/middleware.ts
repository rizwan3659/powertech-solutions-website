import { withAuth } from "next-auth/middleware";

// Protect the admin portal: any /admin route (except the public auth pages
// excluded by the matcher below) requires a valid NextAuth session. Visitors
// without a session are redirected to /admin/login.
//
// This relies on NEXTAUTH_SECRET being configured so the JWT can be verified.
export default withAuth({
  pages: { signIn: "/admin/login" },
});

export const config = {
  matcher: [
    "/admin",
    // everything under /admin EXCEPT the public auth pages
    "/admin/((?!login|signup|forgot-password|reset-password).*)",
    // protect admin-only APIs (image upload, catalog import)
    "/api/admin/:path*",
  ],
};
