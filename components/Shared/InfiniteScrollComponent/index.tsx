import { ReactNode, useState, Dispatch, SetStateAction } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Post as PostI } from 'interfaces/post';

import { useMountEffect } from 'hooks';

interface Props {
  children: ReactNode;
  numberPosts?: number;
  target?: string;
  data: PostI[];
  displayPosts: PostI[];
  setDisplayPosts: Dispatch<SetStateAction<PostI[]>>;
  skipFirst?: boolean;
}

const InfiniteScrollComponent = ({
  children,
  numberPosts = 20,
  displayPosts,
  setDisplayPosts,
  data,
  target,
  skipFirst = false,
}: Props) => {
  const [slice, setSlice] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const addSlice = (skipFirst?: boolean) => {
    const nextSlice = slice + numberPosts;

    if (slice >= data.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }

    setDisplayPosts([
      ...displayPosts,
      ...data.slice(skipFirst ? slice + 1 : slice, nextSlice),
    ]);
    setSlice(slice + numberPosts);
  };

  useMountEffect(() => {
    addSlice(skipFirst);
  });

  return (
    <InfiniteScroll
      dataLength={displayPosts.length}
      next={addSlice}
      hasMore={hasMore}
      loader={false}
      scrollableTarget={target}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
