export const Errors = [
  {
    code: 'auth/expired-action-code',
    title: 'Your token is expired',
    message: 'Your verification token has expired!'
  },
  {
    code: 'auth/invalid-action-code',
    title: 'This action code is invalid',
    message:
      'Your authentiction code is invalid. Please check your email and try again.'
  },
  {
    code: 'auth/user-disabled',
    title: 'Your account has been disabled',
    message:
      'Your account has been disabled. Please contact your administrator.'
  },
  {
    code: 'auth/user-not-found',
    title: `Looks like we couldn't find you`,
    message: 'We could not find an account associated with that email address.'
  },
  {
    code: 'auth/wrong-password',
    title: 'Incorrect login credentials',
    message:
      'We could not log you in. Please check your email and password and try again.'
  },
  {
    code: 'auth/invalid-email',
    title: 'Check your email again',
    message: 'You have entered an invalid email address.'
  },
  {
    code: 'auth/account-exists-with-different-credential',
    title: 'This account already exists',
    message: `Your email address is already associated with an account. Please login using your account's password`
  },
  {
    code: 'auth/auth-domain-config-required',
    title: null,
    message:
      'Domain Config Required. We could not sign you in at this time. Please contact support and try again.'
  },
  {
    code: 'auth/cancelled-popup-request',
    title: null,
    message: ''
  },
  {
    code: 'auth/operation-not-allowed',
    title: `Unfortunately we can't do that`,
    message:
      'Operation not allowed. We could not sign you in at this time. Please contact support and try again.'
  },
  {
    code: 'auth/operation-not-supported-in-this-environment',
    title: `Unfortunately we can't do that`,
    message:
      'Operation not supported in this environment. We could not sign you in at this time. Please contact support and try again.'
  },
  {
    code: 'auth/popup-blocked',
    title: 'Please disable popup blocker',
    message:
      'In order to login we have to show you an oauth popup, but it seems you your ad blocker is not letting us.'
  },
  {
    code: 'auth/popup-closed-by-user',
    title: null,
    message: ''
  },
  {
    code: 'auth/unauthorized-domain',
    title: 'This domain is not allowed',
    message:
      'Unauthorized domain. We could not sign you in at this time. Please contact support and try again.'
  },
  {
    code: 'auth/email-already-in-use',
    title: 'This account already exists',
    message: `Your email address is already associated with an account. Please login using your account's password`
  },
  {
    code: 'auth/weak-password',
    title: 'Try to strengthen your password',
    message:
      'Your password is too weak. It must be at least 8 characters long and contain at least one uppercase and one lowercase letter.'
  },
  {
    code: 'auth/invalid-continue-uri',
    title: null,
    message: 'Oops something went wrong! Please try again later'
  }
];
