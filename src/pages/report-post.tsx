import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ReportPostView } from 'src/sections/post - Copy/view/report-post-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <ReportPostView />
    </>
  );
}

