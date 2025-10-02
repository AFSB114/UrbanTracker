import type { AuthContextType } from '@/types/auth';
import { createContext } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext;
