import AUTH_OPTIONS from '@/lib/auth-options';
import NextAuth from "next-auth";

// Create the NextAuth handler
const handler = NextAuth(AUTH_OPTIONS);

// Export the handler for both GET and POST methods
export { handler as GET, handler as POST };
