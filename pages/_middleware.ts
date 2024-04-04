import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { isMobile } from 'helpers/device';

import { skipFiles } from 'constants/middleware';
import { rewritePaths } from 'constants/rewritePaths';

export function middleware(req: NextRequest) {
  const userAgent = req.headers.get('user-agent');
  const { pathname, origin } = req.nextUrl;

  const encodePath = rewritePaths.find(
    (entity) => `/${encodeURIComponent(entity.encodeUri)}/` === pathname
  )?.source;

  if (
    userAgent &&
    !pathname.startsWith('/api') &&
    !req.headers.get('x-prerender-revalidate') &&
    !pathname.startsWith('/posts/') &&
    !pathname.startsWith('/rss/') &&
    !skipFiles.some((value) => pathname.includes(value))
  ) {
    if (isMobile(userAgent)) {
      return NextResponse.rewrite(
        `${origin}/mobile${encodePath ? encodePath : pathname}`
      );
    } else {
      return NextResponse.rewrite(
        `${origin}/desktop${encodePath ? encodePath : pathname}`
      );
    }
  }

  return NextResponse.next();
}
