import { createCookieSessionStorage } from "@remix-run/node"; // or "@remix-run/cloudflare"

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "user_session",

      // all of these are optional
      // expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      secrets: ["s3cret1"],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };