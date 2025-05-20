export default function BlogPost({ blog }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.description} />
        {/* ... */}
      </Head>

      {/* Then use blog.title, blog.content, etc. everywhere */}
    </>
  );
}
