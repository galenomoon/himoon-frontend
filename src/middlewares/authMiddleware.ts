
import api_client from '@/config/api_client';
import { GetServerSidePropsContext } from 'next';
import { getCookies, getCookie } from 'cookies-next';

import { parseCookies } from 'nookies';

export async function authMiddleware(ctx: GetServerSidePropsContext) {
  const { req } = ctx
  const token = req.cookies.token

  const token2 = parseCookies(ctx).token
  const token3 = req.headers.cookie
  const token4 = getCookies(ctx).token


  const cookieStore = getCookie('token')
  console.log('=======', ctx)

  try {
    const theToken = token || token2 || token3 || token4 || cookieStore
    console.log('theToken', theToken)
    await api_client.get('/auth/current_user/', {
      headers: {
        Authorization: `Bearer ${theToken}`
      }
    })
    return { props: {} }
  } catch (error) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      }
    }
  }
}

export default authMiddleware;
