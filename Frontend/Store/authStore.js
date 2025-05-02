import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set)=>({
            user:null,

            register : async(userData)=>{
                 try{
                     const res = await fetch("/api/registerUser", {
                        method: "POST",
                        headers : {
                           'Content-Type': 'application/json'
                        },
                        credentials : "include",
                        body: JSON.stringify(userData),
                     });

                     const data = await res.json();

                     if(!data.success){
                        return {success:false, message: data.message};
                     }

                     set({user: data.newUser});
                        return {success:true, message: data.message};

                 }catch(err){
                     console.log(err);
                 }
            },

            login : async (userData)=> {
                  try{
                const res = await fetch('/api/loginUser', {
                    method: "POST",
                    headers : {
                           'Content-Type': 'application/json'
                    },
                    credentials : "include",
                    body: JSON.stringify(userData),
                })

                const data = await res.json();

                if(!data.success){
                    return {success :false, message: data.message};
                }

                set({user:data.user});

                 return  {success :true, message: data.message};

                  }catch(err){
                        console.log(err);
                    }
            },

            logout : async ()=>{
             try{
                    const res = await fetch("/api/logoutUser", {
                    method: "POST",
                    headers : {
                           'Content-Type': 'application/json'
                    },
                    credentials : "include",
                });

                const data = await res.json();
                
                if(data.success){
                   localStorage.removeItem('user-storage');
                    set({user:null});
                    return {success : true, message: data.message};
                }
                   return {success : false, message: "Logout Failed"};

             }catch(err){
                 console.log(err);
             }
 

            }

        }),
        {
            name: 'user-storage',
        }

))