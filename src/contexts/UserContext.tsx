import React, { createContext, useEffect, useState, ReactNode } from "react";

//next
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

//config
import { destroyCookie, parseCookies, setCookie } from "nookies";
import api_client from "@/config/api_client";

//interfaces
import { User } from "@/interfaces/user";

//styles
import toast from "react-hot-toast";


interface UserContextProviderProps {
  children: ReactNode;
}

interface ContextProps {
  user: User;
  login: Function;
  logout: Function;
  getCurrentUser: Function;
}

export const UserContext = createContext<ContextProps>({
  user: { email: '' },
  login: () => { },
  logout: () => { },
  getCurrentUser: () => { }
});

export default function UserProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User>({ email: "" });
  const { token } = parseCookies()
  const { push } = useRouter()

  useEffect(() => {
    getCurrentUser()
  }, [token]);

  async function getCurrentUser() {
    if (!token) return logout()
    await api_client.get("/auth/current_user")
      .then(({ data }) => {
        setUser(data)
        return true
      })
      .catch(err => {
        console.error(err)
        return logout()
      })
  }

  async function logout() {
    destroyCookie(undefined, 'token')
    push('/admin/login')
    return false
  }

  async function login(user: User, callback: Function) {
    await api_client.post('/auth/login', user)
      .then(({ data }) => {
        setCookie(undefined, 'token', data.token)
        console.log(data.token, token);
        
        callback()
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401) {
          return toast.error('Email ou senha incorretos')
        }
        if (err.response.status === 500) {
          return toast.error('Algo deu errado, tente novamente mais tarde')
        }
      })
  }

  return (
    <UserContext.Provider value={{ user, login, logout, getCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
