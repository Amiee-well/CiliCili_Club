import store from '@/store';
import { getBaseUrlAuth, getBaseUrlHub } from './baseUrl';
import { getCookie } from 'typescript-cookie';

export const getInviterId = () => {
  if (store?.state?.site?.distribution?.force_inviter_id) {
    return store?.state?.site?.distribution?.force_inviter_id;
  }
  const query = new URLSearchParams(window.location.search);
  const result =
    query.get('inviter_id') || getCookie('INVITER_ID') || store?.state?.site?.distribution?.default_inviter_id;
  return result;
};

export const login = ({
  redirect = '/',
  site = window.location.origin,
  inviteSign = true
}: {
  redirect?: string;
  site?: string;
}) => {
  const hubBaseUrl = getBaseUrlHub();
  const inviterId = getInviterId();
  const callbackUrl = `${hubBaseUrl}/auth/callback?redirect=${redirect}`;
  const targetBaseUrl = `${hubBaseUrl}/auth/login`;
  const targetQuery = {
    ...(inviterId && inviteSign ? { inviter_id: inviterId } : {})
  };
  const targetUrl = `${targetBaseUrl}?${new URLSearchParams(targetQuery).toString()}`;
  window.location.href = targetUrl;
};
