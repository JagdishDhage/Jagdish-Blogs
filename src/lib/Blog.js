import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
    date: { type: Date, default: Date.now },
    image: { type: String, default: "default-blog.jpg" },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
 
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    slug: { type: String, unique: true, required: true, lowercase: true }
}, { timestamps: true });


BlogSchema.pre("save", async function (next) {
    if (!this.slug) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }

    
    let existingBlog = await mongoose.models.Blog.findOne({ slug: this.slug });
    if (existingBlog) {
        this.slug = `${this.slug}-${Date.now()}`;
    }

    next();
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
