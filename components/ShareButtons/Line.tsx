import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';

import createShareButton from './hocs/createShareButton';

function lineLink(url: string, { title }: { title?: string }) {
  assert(url, 'line.url');

  return (
    'https://social-plugins.line.me/lineit/share' +
    objectToGetParams({
      url,
      text: title,
    })
  );
}

const LineShareButton = createShareButton<{ title?: string }>(
  'line',
  lineLink,
  (props) => ({
    title: props.title,
  }),
  {
    windowWidth: 500,
    windowHeight: 500,
  }
);

export default LineShareButton;
