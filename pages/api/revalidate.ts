import { NextApiRequest, NextApiResponse } from 'next';

/*

Revalidate request example:

pageUrl = /posts/third-page/ - should be with closed slash
REVALIDATE_TOKEN = token , which give you access to send request

/api/revalidate/?pagePath=pageUrl&secret=REVALIDATE_TOKEN

*/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret, pagePath } = req.query;

  if (secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!pagePath) {
    return res
      .status(401)
      .json({ message: 'pagePath param should be provided in query params' });
  }

  if (pagePath) {
    const path = pagePath as string;

    try {
      await res.unstable_revalidate(path);
      return res.json({ revalidated: true });
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }

  return res.status(401).json({ message: 'Something went wrong' });
}
