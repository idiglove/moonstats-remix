import type { LoaderFunction} from '@remix-run/node';
import { redirect } from '@remix-run/node'
import { destroySession, getSession } from '~/utils/sessions'

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('user')) {
    return redirect('/',  {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    })
  }

  return null
}
