import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type TUser = {
    login: string,
    password: string,
}

type TAppStateContext = {
    loggedUser: TUser | null,
    setLoggedUser: (user: TUser) => void
}

// @ts-expect-error
const Context = createContext<TAppStateContext>(null);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
    const [loggedUser, setLoggedUser] = useState<TAppStateContext['loggedUser']>(null);

    useEffect(() => {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
            setLoggedUser({ login: 'admin', password: 'admin' });
        }
    }, []);

    return <Context.Provider value={{
        loggedUser,
        setLoggedUser,
    }}>
        {children}
    </Context.Provider>
}

export const useAppStateContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useAppStateContext must be used within a AppStateProvider');
    }
    return context;
}