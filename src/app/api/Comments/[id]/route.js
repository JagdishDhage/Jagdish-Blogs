import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig"; 
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json(); 
    const { comment } = body;

    const docRef = doc(db, 'blogs', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    await updateDoc(docRef, {
      comments: arrayUnion({
        comment,
        timestamp: Date.now(),
      }),
    });

    return NextResponse.json({ message: "Comment added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}
