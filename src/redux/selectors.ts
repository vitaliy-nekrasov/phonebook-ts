interface RootState {
  contacts: object;
  filter: {
    value: string;
  };
  auth: {
    user: {
      name: string;
      email: string;
    };
    token: string;
    isLoggedIn: boolean;
    isRefreshing: boolean;
  };
}

export const selectEmail = (state: RootState) => state.auth.user.email;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectFilterValue = (state: RootState) => state.filter.value;
