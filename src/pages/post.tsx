import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PostView } from 'src/sections/post/view/post-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <PostView />
    </>
  );
}

