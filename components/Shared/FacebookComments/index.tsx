import { useEffect } from 'react';

interface Props {
  url: string;
}

const FacebookComments = ({ url }: Props) => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  });

  return (
    <div
      className="fb-comments"
      data-href={`https://www.facebook.com/${url}/`}
      data-width="100%"
      data-numposts="5"
      data-order-by="reverse_time"
    />
  );
};

export default FacebookComments;
