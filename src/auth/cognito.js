import { UserManager } from 'oidc-client-ts'

const cognitoAuthConfig = {
  authority: 'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_iyQfb0wNX',
  client_id: '1v3622thus3soqp3tr00d43p82',
  redirect_uri: 'http://localhost:5173/login_callback',
  response_type: 'code',
  scope: 'phone openid email aws.cognito.signin.user.admin profile',
  userinfo_endpoint: '/oauth2/userInfo',
}

export const userManager = new UserManager({ ...cognitoAuthConfig })
export async function signoutRedirect() {
  const clientId = cognitoAuthConfig.client_id
  const logoutUri = 'http://localhost:5173/login'
  const cognitoDomain = 'https://ap-south-1iyqfb0wnx.auth.ap-south-1.amazoncognito.com'
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`
}
