import { TokenService } from '@/api/services/Token.service';

describe('TokenService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set and get access token from local storage', () => {
    TokenService.setAccessTokenToLS('sampleToken', 'client');
    const token = TokenService.getAccessTokenFromLS();
    expect(token).toEqual({ type: 'client', token: 'sampleToken' });
  });

  it('should set and get refresh token from local storage', () => {
    TokenService.setRefreshTokenToLS('sampleToken', 'customer');
    const token = TokenService.getRefreshTokenFromLS();
    expect(token).toEqual({ type: 'customer', token: 'sampleToken' });
  });

  it('should remove tokens from local storage', () => {
    TokenService.setAccessTokenToLS('sampleToken', 'anonymous');
    TokenService.setRefreshTokenToLS('sampleToken', 'customer');
    TokenService.removeTokensFromLS();
    const accessToken = TokenService.getAccessTokenFromLS();
    const refreshToken = TokenService.getRefreshTokenFromLS();
    expect(accessToken).toBeNull();
    expect(refreshToken).toBeNull();
  });

  it('should get access token from state if available', () => {
    const mockState = {
      auth: {
        access_token: 'stateAccessToken',
      },
    };

    const originalGetState = TokenService.getAccessToken;
    TokenService.getAccessToken = () => mockState.auth.access_token;

    const accessToken = TokenService.getAccessToken();
    expect(accessToken).toEqual('stateAccessToken');

    TokenService.getAccessToken = originalGetState;
  });
});
