import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseConfig";
import { serialize } from "cookie";
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        status: 400,
        message: "Email and password are required",
      });
    }
    const auth = getAuth();
    if (!auth || !db) {
      return NextResponse.json({
        status: 400,
        message: "firebase is not configure",
      });
    }
    
    const usersignin = await signInWithEmailAndPassword(auth, email, password);
    const user = usersignin.user;
    const token = await user.getIdToken();
    const response = NextResponse.json({
      status: 200,
      message: "Login Successfull",
    });
    response.headers.set(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge:60*60*24*7
      })
    );
    return response;
  } catch (e) {
    return NextResponse.json({ msg: "error", e }, { status: 500 });
  }
}
