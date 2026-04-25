export type User = {
    id: string;
    email: string;
    username: string;
};

export type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}