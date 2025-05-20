import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get("file"); 

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET); 

        const cloudinaryRes = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const cloudinaryData = await cloudinaryRes.json();
        console.log("cloudinaryData",cloudinaryData);
        return NextResponse.json({ url: cloudinaryData.secure_url }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
