import * as api from '@/api/api';
import { PROJECT_KEY, SCOPE } from '@/api/api';
import { AuthService } from '@/api/services/Auth.services';

jest.mock('../api/api.ts');

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call post with correct arguments for login', async () => {
    const mockToken = 'mockToken';
    const mockValues = {
      scope: SCOPE,
      email: 'test@example.com',
      password: 'testpassword',
    };

    (api.post as jest.Mock).mockResolvedValue({ success: true });

    const result = await AuthService.login(mockValues, mockToken);

    expect(api.post).toHaveBeenCalledWith(`/${PROJECT_KEY}/me/login`, mockToken, JSON.stringify(mockValues));
    expect(result).toEqual({ success: true });
  });

  it('should call post with correct arguments for signUp', async () => {
    const mockToken = 'mockToken';
    const mockValues = {
      email: 'test@example.com',
      password: 'testpassword',
      firstName: 'John',
      lastName: 'Doe',
      addresses: [
        {
          phone: '1234567890',
          country: 'Country A',
          city: 'City A',
          streetName: 'Street A',
          building: 'Building A',
          apartment: 'Apartment A',
          postalCode: '12345',
        },
      ],
      shippingAddresses: [0],
      billingAddresses: [1],
    };

    (api.post as jest.Mock).mockResolvedValue({ success: true });

    const result = await AuthService.signUp(mockValues, mockToken);

    expect(api.post).toHaveBeenCalledWith(`/${PROJECT_KEY}/me/signup`, mockToken, JSON.stringify(mockValues));
    expect(result).toEqual({ success: true });
  });

  it('should call authPost with correct arguments for getAnonymousAccessToken', async () => {
    (api.authPost as jest.Mock).mockResolvedValue({ token: 'sampleToken' });

    const result = await AuthService.getAnonymousAccessToken();

    expect(api.authPost).toHaveBeenCalledWith(`/oauth/${PROJECT_KEY}/anonymous/token`, {
      grant_type: 'client_credentials',
      scope: SCOPE,
    });
    expect(result).toEqual({ token: 'sampleToken' });
  });

  it('should call authPost with correct arguments for getCustomerAccessToken', async () => {
    const mockUserCredentials = {
      username: 'test@example.com',
      password: 'testpassword',
    };

    (api.authPost as jest.Mock).mockResolvedValue({ token: 'sampleToken' });

    const result = await AuthService.getCustomerAccessToken(mockUserCredentials);

    expect(api.authPost).toHaveBeenCalledWith(`/oauth/${PROJECT_KEY}/customers/token`, {
      grant_type: 'password',
      username: mockUserCredentials.username,
      password: mockUserCredentials.password,
      scope: SCOPE,
    });
    expect(result).toEqual({ token: 'sampleToken' });
  });

  it('should call authPost with correct arguments for refreshCustomerAccessToken', async () => {
    const mockRefreshToken = 'sampleRefreshToken';

    (api.authPost as jest.Mock).mockResolvedValue({ token: 'sampleToken' });

    const result = await AuthService.refreshCustomerAccessToken(mockRefreshToken);

    expect(api.authPost).toHaveBeenCalledWith(`/oauth/${PROJECT_KEY}/customers/token`, {
      grant_type: 'refresh_token',
      refresh_token: mockRefreshToken,
    });
    expect(result).toEqual({ token: 'sampleToken' });
  });
});
