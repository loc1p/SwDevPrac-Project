import "next-auth";
import "next-auth/jwt";

// user data returned from the backend login, kept in the session and the JWT
interface BackendUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
}

declare module "next-auth" {
    interface Session {
        user: BackendUser
    }
    interface User extends BackendUser {
        id: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends Partial<BackendUser> {
        id?: string;
    }
}
