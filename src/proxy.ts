// src/proxy.ts
import { withAuth } from "next-auth/middleware";
export default withAuth({
  pages: { signIn: "/signin" },
});

export const config = {
  matcher: ["/registrations/:path*", "/cart", "/workshop/new", "/workshop/:wid/edit", "/dashboard"],
};
