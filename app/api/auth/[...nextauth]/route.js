import NextAuth from "next-auth/next"; // tutorial imports from "next-auth" and not "next-auth/next", is this an issue?
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "bam@email.com" },
        password: { label: "Password", type: "password" },
      }
    },
    async (credentials, req) => {
      // const { email, password } = credentials;
      const { email, password } = req.json();

      console.log('email :>> ', email);
      console.log('password :>> ', password);
      const client = await connectToDB();
      const user = await User.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return user;
      }
    }
    return null;
  }),
    
  ],
  callbacks: {
    async session({session}){
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({
        email: session.user.email
      });
      session.user.id = sessionUser._id.toString();
      return session; 
    },
    async signIn({account, profile, user, credentials}) {
      try {
        await connectToDB();
  
        // check if user already exists
        const userExists = await User.findOne({ email: profile.email});
  
        // if NOT, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (err) {
        console.log('err checking if user exists :>> ', err);
        return false;
      }
    }
  }
})

export { handler as GET, handler as POST};