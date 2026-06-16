import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host.endsWith(".vercel.app")) {
    const url = request.nextUrl.clone();
    url.host = "getintentional.ai";
    url.port = "";
    return NextResponse.redirect(url, { status: 308 });
  }
}

export const config = {
  matcher: "/((?!_next|favicon.ico).*)",
};
