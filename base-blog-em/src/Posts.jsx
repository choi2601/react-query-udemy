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

  // 데이터 리패칭은 데이터가 만료되었을 때만 실행
  // stale time: 데이터 만료될 때까지의 허용되는 시간

  // stale time은 왜 기본적으로 0ms로 설정이 되는 것인가
  // 업데이트가 왜 안죠? 보단 데이터가 어떻게 늘 최신 상태를 유지하나요?
  // 데이터는 항상 만료되어 있고 서버에서 항상 새로운 데이터를 가져와야 함을 의미

  // stale time: refetch할 때 고려 사항

  // 캐시(cache)는 나중에 다시 핋요할 수도 있는 데이터용
  // 특정 쿼리에 대한 활성 useQuery가 없는 경우 해당 데이터는 콜드 스토리지(code storage)로 이동
  // 구성된 cacheTime이 지나면 캐시의 데이터가 만료되며 유효 시간의 기본값은 5분
  // 특정 쿼리에 대한 useQuery가 활성화된 후 경과된 시간(페이지에 표시되는 컴포넌트가 특정 쿼리에 대해 useQuery를 사용한 시간)

  // 캐시가 만료되면 가비지 컬렉션이 실행되고 클라이언트는 데이터를 사용할 수 없게 됨(빈 화면을 보게 될 수 있음)

  const { data, isError, error, isLoading } = useQuery("posts", fetchPosts, {
    staleTime: 2000,
  });

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
