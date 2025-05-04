import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set)=>({
            user:null,
            token : "",
            ideas :[],

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
                     set({token: "valid"});
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
                set({token: "valid"});
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
                    set({token: ""});
                    return {success : true, message: data.message};
                }
                   return {success : false, message: "Logout Failed"};

             }catch(err){
                 console.log(err);
             }
 

            },

            autoLogin : async ()=>{
                try{
                     const res = await fetch("/api/autoCheck", {
                        method:"POST",
                        credentials : "include",
                     })

                     const data = await res.json();
 
                     if(!data.success){
                         set({user : null});
                          set({token: ""});
                        return {success: false, message:data.message};

                     }
                     set({user : data.user});
                      set({token: "valid"});
                       return  {success: true, message:"Auto-Login Successfully"};

                }catch(err){
                        console.log(err);  
                }
            },

            fetchIdeas : async(userID)=>{
                 try{
                      const res = await fetch("/api/fetchIdeas", {
                        method : "POST",
                        headers : {
                           'Content-Type': 'application/json'
                    },
                       body : JSON.stringify({userID})
                      });


                      const data = await res.json();
                      console.log(data);

                      if(!data.success)
                        return {success : false, message: data.message};

                      set({ideas : data.ideas});
                        return {success : true, message: data.message};

                 }catch(err){
                    console.log(err);
                 }
            }

        }),
        {
            name: 'user-storage',
        }

))