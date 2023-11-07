import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type User = {
	serialNumber: string;
	name: string;
	surname: string;
	balance: number;
	profilePhoto: string;
};

type UserContextType = {
	user: User | null;
	fetchUser: (serialNumber: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
	children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = useState<User | null>(null);

	const fetchUser = async (serialNumber: string) => {
		try {
			// Substitua pela chamada real do seu backend
			const response = await fetch(`/api/user/${serialNumber}`);
			if (response.ok) {
				const data = await response.json();
				setUser(data);
			} else {
				console.error('Erro ao buscar dados do usuário');
			}
		} catch (error) {
			console.error('Erro ao buscar dados do usuário:', error);
		}
	};

	return (
		<UserContext.Provider value={{ user, fetchUser }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser deve ser usado dentro de um UserProvider');
	}
	return context.user;
}

export function useFetchUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useFetchUser deve ser usado dentro de um UserProvider');
	}
	return context.fetchUser;
}
