import { NextResponse } from "next/server";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "@/lib/firebaseConfig";
import { serialize } from "cookie";
import { doc, setDoc } from "firebase/firestore";
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    const auth = getAuth();
    if (!name || !email || !password) {
      return NextResponse.json({ msg: "enter the details" }, { status: 400 });
    }
    if (!db || !auth) {
      return NextResponse.json(
        { msg: "firebase not configured" },
        { status: 400 }
      );
    }

    const createUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = createUser.user;

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,

      createdAt: Date.now(),
    });
    const token = await user.getIdToken();

    const response = NextResponse.json(
      { msg: "user created" },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      })
    );

    return response;
  } catch (e) {
    return NextResponse.json({ msg: "error", e }, { status: 500 });
  }
}
