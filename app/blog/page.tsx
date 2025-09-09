'use client';

import { useEffect, useState } from 'react';

type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
};

export default function Page() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Unknown date';
    }
  };

  if (loading) {
    return (
      <section style={{ marginTop: "2vh" }}>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-neutral-600">Loading posts...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section style={{ marginTop: "2vh" }}>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800">Error loading blog posts: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ marginTop: "2vh" }}>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600 text-lg">No posts available at the moment.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post, index) => (
            <article key={index} className="border-b border-neutral-200 pb-8 last:border-b-0">
              <div className="mb-4">
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <h2 className="text-xl font-semibold text-neutral-800 mb-2 group-hover:text-neutral-600 transition-colors duration-200">
                    {post.title}
                  </h2>
                </a>
                <div className="text-sm text-neutral-600 mb-3">
                  {formatDate(post.pubDate)}
                </div>
              </div>
              
              <div className="text-neutral-700 leading-relaxed mb-4">
                {post.contentSnippet && post.contentSnippet.length > 200 
                  ? `${post.contentSnippet.substring(0, 200)}...`
                  : post.contentSnippet
                }
              </div>
              
              <a 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-neutral-600 hover:text-neutral-800 transition-colors duration-200 group"
              >
                Read more
                <svg 
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M13.29 9.29l-4 4a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4-4a1 1 0 0 0-1.42-1.42z"/>
                  <path d="M12.28 17.4L11 18.67a4.2 4.2 0 0 1-5.58.4 4 4 0 0 1-.27-5.93l1.42-1.43a1 1 0 0 0 0-1.42 1 1 0 0 0-1.42 0l-1.27 1.28a6.15 6.15 0 0 0-.67 8.07 6.06 6.06 0 0 0 9.07.6l1.42-1.42a1 1 0 0 0-1.42-1.42z"/>
                  <path d="M19.66 3.22a6.18 6.18 0 0 0-8.13.68L10.45 5a1.09 1.09 0 0 0-.17 1.61 1 1 0 0 0 1.42 0L13 5.3a4.17 4.17 0 0 1 5.57-.4 4 4 0 0 1 .27 5.95l-1.42 1.43a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l1.42-1.42a6.06 6.06 0 0 0-.6-9.06z"/>
                </svg>
              </a>
            </article>
          ))}
        </div>
      )}
      
      <div className="mt-12 pt-8 border-t border-neutral-200">
        <p className="text-neutral-600 text-center">
          Subscribe to my{' '}
          <a 
            href="https://rajatgangrade.substack.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-800 hover:underline font-medium"
          >
            Substack newsletter
          </a>{' '}
          for more posts and updates.
        </p>
      </div>
    </section>
  );
}
