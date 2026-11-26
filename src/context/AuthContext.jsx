import { createContext, useState } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";
import { STORAGE_KEYS, createAccount } from "../model/model";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useLocalStorage(STORAGE_KEYS.accounts, []);
  const [currentAccountId, setCurrentAccountId] = useLocalStorage(
    STORAGE_KEYS.currentAccountId,
    null
  ); // Select current account so task and tag can use the ID

  const [error, setError] = useState(null);


  const currentAccount = accounts.find((a) => a.id === currentAccountId) ?? null;

  // Creating a new Account
  const register = ({ name, email, password }) => {
    setError(null);
    const exists = accounts.some(
      (a) => a.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      setError("Email already registered");
      return false;
    }

    const account = createAccount({ name, email, password });
    setAccounts((prev) => [...prev, account]);
    setCurrentAccountId(account.id); // automaically login
    return true;
  };

  const login = (email, password) => {
    setError(null);
    const account = accounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (!account) {
      setError("Invalid email or password");
      return false;
    }
    setCurrentAccountId(account.id);
    return true;
  };

  const logout = () => setCurrentAccountId(null);

  const value = { currentAccount, error, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}