import Cookies from "js-cookie";
import { defineStore } from 'pinia';
import Api from '../services/api';


type Credentials = {
    email: string;
    password: string;
};
type User = {
    id: number;
    name: string;
    email: string;
};


export const useUser = defineStore('user', {
    state:()=>{
        return{

            user: (Cookies.get('user')?JSON.parse(Cookies.get('user')as string):{}) as User | null,
            token:Cookies.get('token') || ''
        }
    },
    actions: {
        async login(credentials: Credentials) {

            try {
                const response = await Api.post('/api/login', credentials);
                this.user = response.data.data.user;
                this.token = response.data.data.token;


                Cookies.set('token', 'Bearer ' + response.data.data.token);

                Cookies.set('user', JSON.stringify(response.data.data.user));
            } catch (error) {
                throw error;
            }


        },
        async logout(){
            this.user=null;
            this.token = '';

            Cookies.remove('token');
            Cookies.remove('user');
        },
    },
    getters: {
        getUser : (state)=>state.user,
        getToken : (state) => state.token
    }
});