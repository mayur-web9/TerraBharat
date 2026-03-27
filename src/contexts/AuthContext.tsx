import React, { createContext, useContext, useEffect, useState } from 'react';

export type User = {
  id: string;
  email?: string;
  full_name?: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (opts: { email: string; full_name?: string; password?: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('jharYatraUser');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const ADMIN_EMAIL = 'mayurpatil23.ca@jspmuni.ac.in';

  const signIn = async ({ email, full_name, password }: { email: string; full_name?: string; password?: string }) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== ADMIN_EMAIL) {
      throw new Error('Only admin users can login here.');
    }

    if (password !== '$$$Mayur629877') {
      throw new Error('Incorrect security key.');
    }

    const userData: User = {
      id: normalizedEmail,
      email: normalizedEmail,
      full_name: full_name?.trim() || undefined,
    };

    setUser(userData);
    localStorage.setItem('jharYatraUser', JSON.stringify(userData));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('jharYatraUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
