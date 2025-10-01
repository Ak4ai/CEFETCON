import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, User } from '../types';
import { authService } from '../services/api';

type AuthAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'RESTORE_SESSION'; payload: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false
      };
    case 'RESTORE_SESSION':
      return {
        user: action.payload,
        isAuthenticated: true
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string, role: 'admin' | 'juror') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = React.useState(false);

  // Restaurar sessão ao inicializar
  useEffect(() => {
    const storedUser = authService.getStoredUser();
    const storedToken = authService.getStoredToken();
    
    if (storedUser && storedToken) {
      dispatch({ type: 'RESTORE_SESSION', payload: storedUser });
    }
  }, []);

  const login = async (email: string, password: string, role: 'admin' | 'juror') => {
    setLoading(true);
    try {
      const { user } = await authService.login(email, password, role);
      dispatch({ type: 'LOGIN', payload: user });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};