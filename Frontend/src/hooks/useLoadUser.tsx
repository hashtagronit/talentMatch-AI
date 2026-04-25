// this hook will load the  user data in user context
//on reload context gets cleared so we need to load the user data again

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { userMapper } from "@/utils/mappers/userMapper";
import { useGetUserProfile } from "./useGetUserProfile";


export const useLoadUser = () => {
    const { user, setUser, setLoading} = useAuth(); 
    const { handleGetUserProfile } = useGetUserProfile();

    useEffect(() => {
        const getAndSetUserData = async() => {
            try {
                if(!user){
                    const response= await handleGetUserProfile();
                    if(response.user){
                        setUser(userMapper(response.user));
                    }
                }
            } catch (error) {
                console.log("User not authenticated")   
            }finally{
                setLoading(false);
            }
        }
        getAndSetUserData();
    }, []);
};