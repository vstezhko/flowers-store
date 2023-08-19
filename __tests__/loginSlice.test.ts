import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { loginSlice, initialState, LoginState } from '@/redux/slices/loginSlice/loginSlice';
import { CustomerService } from '@/api/services/Customer.service';
import { getCustomerAsync, loginAsync, signUpAsync } from '@/redux/slices/loginSlice/thunks';
import { AuthService } from '@/api/services/Auth.services';

describe('loginSlice', () => {
  let store: EnhancedStore<{ login: LoginState }>;

  beforeEach(() => {
    store = configureStore({ reducer: { login: loginSlice.reducer } });
  });

  it('should handle setIsLogin', () => {
    store.dispatch(loginSlice.actions.setIsLogin(true));
    const state = store.getState().login;
    expect(state.isLogin).toBe(true);
  });

  it('should handle setIsSignUp', () => {
    store.dispatch(loginSlice.actions.setIsSignUp(true));
    const state = store.getState().login;
    expect(state.isSignUp).toBe(true);
  });

  it('should handle removeMessage', () => {
    store.dispatch(loginSlice.actions.removeMessage());
    const state = store.getState().login;
    expect(state.message).toBe('');
  });

  it('should handle removeCustomer', () => {
    const initialStateWithCustomer = {
      login: {
        ...initialState,
        customer: {
          ...initialState.customer,
        },
      },
    };
    store = configureStore({ reducer: { login: loginSlice.reducer }, preloadedState: initialStateWithCustomer });

    store.dispatch(loginSlice.actions.removeCustomer());
    const state = store.getState().login;
    expect(state.customer).toEqual({
      ...initialState.customer,
    });
  });

  it('should handle setMessage', () => {
    const message = 'Test message';
    const variant = 'error';
    store.dispatch(loginSlice.actions.setMessage({ message, variant }));
    const state = store.getState().login;
    expect(state.message).toBe(message);
    expect(state.variant).toBe(variant);
  });

  it('should fetch customer data and update state', async () => {
    const mockToken = 'mockToken';
    const mockCustomerData = { name: 'John', email: 'john@example.com' };
    const mockCustomerService = jest.spyOn(CustomerService, 'getCustomer').mockResolvedValue(mockCustomerData);

    await store.dispatch(getCustomerAsync(mockToken) as any);

    const state = store.getState().login;
    expect(mockCustomerService).toHaveBeenCalledWith(mockToken);
    expect(state.customer).toEqual(mockCustomerData);
  });

  it('should handle loginAsync', async () => {
    const mockLoginPayload = { username: 'testuser', password: 'testpassword' };
    const mockToken = 'mockToken';
    const mockAuthService = jest.spyOn(AuthService, 'login').mockResolvedValue(mockToken);

    await store.dispatch(loginAsync({ loginPayload: mockLoginPayload, token: mockToken }) as any);

    const state = store.getState().login;
    expect(mockAuthService).toHaveBeenCalledWith(mockLoginPayload, mockToken);
    expect(state).toEqual(expect.objectContaining({ isLogin: true }));
  });

  it('should handle signUpAsync', async () => {
    const mockSignUpPayload = {
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
      shippingAddressIds: [0],
      billingAddressIds: [0],
    };
    const mockToken = 'mockToken';
    const mockAuthService = jest.spyOn(AuthService, 'signUp').mockResolvedValue(mockToken);

    await store.dispatch(signUpAsync({ signUpPayload: mockSignUpPayload, token: mockToken }) as any);

    const state = store.getState().login;
    expect(mockAuthService).toHaveBeenCalledWith(mockSignUpPayload, mockToken);
    expect(state.isSignUp).toBe(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
