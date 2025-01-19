import { useState, useEffect } from 'react';
import { fetchPosts, deletePost, updatePost } from './api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostDetail } from './PostDetail';
const maxPostPage = 10;

export default function Posts() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
  });

  const updateMutation = useMutation({
    mutationFn: (postId) => updatePost(postId),
  });

  // 페이지 prefetch
  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;

      // queryClient => 캐시 제어
      queryClient.prefetchQuery({
        queryKey: ['posts', nextPage],
        queryFn: () => fetchPosts(nextPage),
      });
    }
  }, [currentPage, queryClient]);
  //useQuery는 api fetch, 상태 관리
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage),
    staleTime: 2000, // 2s
  });

  // if (!data) return <div />;

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => {
              // 취소눌러 포스트 삭제한 상태가 다른 요소 클릭했을때도 적용됨으로 리셋해줌!
              deleteMutation.reset();
              updateMutation.reset();
              setSelectedPost(post);
            }}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          deleteMutation={deleteMutation}
          updateMutation={updateMutation}
        />
      )}
    </>
  );
}
