import { useState } from 'react';
import { fetchPosts } from './api';
import { useQuery } from '@tanstack/react-query';
import { PostDetail } from './PostDetail';

export default function Posts() {
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 2000, // 2s
  });

  // if (!data) return <div />;

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h2>{error.message}</h2>;
  console.log(data?.[0].title);

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
