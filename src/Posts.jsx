import { useState } from 'react';
import { fetchPosts } from './api';
import { useQuery } from '@tanstack/react-query';
import { PostDetail } from './PostDetail';

export default function Posts() {
  const [selectedPost, setSelectedPost] = useState(null);

  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // if (!data) return <div />;

  console.log(data?.[0].title);

  return (
    <>
      <ul>
        {data?.map((post) => (
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
