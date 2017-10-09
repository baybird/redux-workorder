// Action type
export const AUTHENTICATED = 'AUTHENTICATED';

// Action creator
export function auth(email, authenticated){
  return {
    type: AUTHENTICATED,
    authenticated: authenticated,
    email: email
  };
}


