import axios from "axios"
import cookies from 'cookie-universal'
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const userServices = axios.create({
    baseURL: import.meta.env.VITE_USER_SERVICES_URL,
})

const useApi = () => {
    const navigate = useNavigate();
    const Cookies = cookies();

    const useGetUser = async () => {
        try {

            const { data } = await userServices.get('/', {
                withCredentials: true
            })

            return data
        } catch (error: any) {
            console.error('Error during sign in:', error.message);
        }
    }

    const useGetRole = async () => {
        try {

            const { data } = await userServices.get('/roles', {
                withCredentials: true
            })

            return data
        } catch (error: any) {
            console.error('Error during sign in:', error.message);
        }
    }

    const useSignIn = async (value: any) => {
        try {
            const { username, password } = value;
            const isPhoneNumber = /^\d+$/.test(username);
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

            const headers = {
                'email': null,
                'password': password,
                'phone_number': null,
            };

            if (isPhoneNumber) {
                headers.phone_number = username;
            } else if (isEmail) {
                headers.email = username;
            } else {
                throw new Error("Invalid username format. Must be either a valid email or phone number.");
            }

            const { data } = await userServices.post('/user-login-services', {}, { headers });

            if (!data) {
                console.error('Signing failed')
            } else {
                Cookies.set(
                    'token', data?.token,
                    { maxAge: 60 * 60 * 24 * 7 }
                )
                enqueueSnackbar(data.message, { variant: "success" });
                navigate('/home')
            }

        } catch (error: any) {
            console.error('Error during sign in:', error.message);
            enqueueSnackbar("Invalid username or password", { variant: "error" });
        }

    }

    const useSignUp = async (value: any) => {
        try {
            const { email, password, phone_number } = value
            const headers = {
                'email': email,
                'password': password,
                'phone_number': phone_number,
            }

            const { data } = await userServices.post('/user-register-services', {}, { headers })

            if (!data) {
                console.error('Signup failed')
            } else {
                enqueueSnackbar(data.message, { variant: "success" });
                navigate("/sign-in");
            }
        } catch (error: any) {
            console.error('Error during sign in:', error.message);
            enqueueSnackbar("E-mail or phone number is already.", { variant: "error" });

        }
    }

    const useLogout = () => {
        try {
            Cookies.remove('token')
            window.location.reload();
        } catch (error) {

        }
    }

    return { useGetUser, useGetRole, useSignIn, useSignUp, useLogout }
}

export default useApi