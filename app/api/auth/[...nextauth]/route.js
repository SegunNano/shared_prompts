import NextAuth from "next-auth";
import { signIn } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@config/db";
import User from "@models/userModel";

const handler = NextAuth({
    debug: true, // ✅ Logs detailed errors
    secret: process.env.NEXTAUTH_SECRET, // ✅ Ensure it's set
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const { email } = session.user;
            const sessionUser = await User.findOne({ email });
            session.user.id = sessionUser._id.toString();
            return session;
        },

        async signIn({ profile }) {
            const { email, name, picture } = profile;
            const username = name.replace(' ', '');
            try {
                await connectDB();
                const existingUser = await User.findOne({ email });
                !existingUser && await User.create({
                    email,
                    username,
                    image: picture
                });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };