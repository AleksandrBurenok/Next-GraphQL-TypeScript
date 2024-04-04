import {
  getServerSideProps as getServerSidePropsCategoryHandler,
  GetServerSideProps as GetCategoryProps,
} from 'dataFetching/page/category';

import {
  getServerSideProps as getServerSidePropsPostHandler,
  GetServerSideProps as GetPostProps,
} from 'dataFetching/page/post';

import { categories } from 'config/categories';

export type GetServerSideProps = GetCategoryProps & GetPostProps;

export async function getServerSideProps({ params }: GetServerSideProps) {
  const isCategory = categories.some(
    (entity) => JSON.stringify(entity) === JSON.stringify(params.url)
  );

  const notFound = {
    notFound: true,
  };

  if (isCategory) {
    const { props: categoryProps } = await getServerSidePropsCategoryHandler({
      params,
    });

    if (categoryProps.category)
      return {
        props: categoryProps,
      };
    return notFound;
  }

  if (params.url.length > 1) {
    return notFound;
  }

  const { props: postProps } = await getServerSidePropsPostHandler({
    params: { slug: params.url[0] },
  });

  if (postProps.page)
    return {
      props: postProps,
    };
  return notFound;
}
