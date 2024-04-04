import { NextApiResponse, NextApiRequest } from 'next';

function Robots() {
  return null;
}

interface GetServerSideProps {
  req: NextApiRequest;
  res: NextApiResponse;
}

const prodHost = 'www.buaksib.com';

const prodFile = `User-agent: *
Allow: /
Sitemap: https://www.buaksib.com/sitemap.xml
Host: ${prodHost}`;

const devFile = `User-agent: *
Disallow: /`;

export const getServerSideProps = async ({ req, res }: GetServerSideProps) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write(process.env.HOST === prodHost ? prodFile : devFile);
  res.end();

  return {
    props: {},
  };
};

export default Robots;
