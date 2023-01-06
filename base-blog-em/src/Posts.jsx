import { useState } from "react";

import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // isFetching: 비동기 쿼리가 해결(resolved)되지 않았음을 의미
  // isLoading: isFetching의 하위 집합. 캐싱된 데이터도 없고 쿼리를 만든 적도 없는 경우를 의미

  // 기본적으로 react-query는 fetch 시도를 3번 함
  const { data, isError, error, isLoading } = useQuery("posts", fetchPosts);

  if (isLoading) return <h3>loading...</h3>;
  if (isError)
    return (
      <>
        <h3>Oops, someting went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );

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
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
