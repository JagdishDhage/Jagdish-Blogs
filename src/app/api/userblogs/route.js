import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    const title = data.get("title");
    const content = data.get("content");
    const description=data.get("description");
    

    if (!file || !title || !content) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Upload file to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    const cloudinaryData = await cloudinaryRes.json();
    if (!cloudinaryData.secure_url) {
      return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 500 });
    }

   
    await addDoc(collection(db, "blogs"), {
      title,
      content,
      description,
      imageUrl: cloudinaryData.secure_url,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Blog uploaded successfully!", url: cloudinaryData.secure_url }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Upload failed", details: error.message }, { status: 500 });
  }
}
