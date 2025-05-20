import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseConfig";
import { getDocs,collection, doc } from "firebase/firestore";
export async function GET() {
const data= await getDocs(collection(db,'blogs'));
const blogs= await data.docs.map((doc)=>({
    id:doc.id,
    ...doc.data()
}))
  return NextResponse.json(blogs);
}

