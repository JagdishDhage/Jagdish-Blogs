import BlogPost from '@/Component/View/BlogPost';

export default async function ViewBlogPage({ params }) {
    const { slug } = await params;
    
    const res = await fetch(`http://localhost:3000/api/GetBlog/${slug}`, { cache: 'no-store' });
    const blogs = await res.json();
    console.log(blogs)
    // if (!Array.isArray(blogs)) {
    //     return <div>Error fetching blogs</div>;  // Handle non-array response
    // }

    // const blog = blogs.find(item => item.slug === slug);

    // if (!blog) return <div>Blog not found</div>;

    return <BlogPost blog={blogs} />;
}
