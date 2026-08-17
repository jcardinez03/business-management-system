import { Navbar } from "@/layout/Navbar"
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Briefcase, User, Lock } from "lucide-react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const validateForm = () => {
        let valid = true;
        if (loginForm.email === "") {
            setErrors((prev) => ({
                ...prev,
                email: "Email address cannot be empty."
            }));

            valid = false;
        }

        if (loginForm.password === "") {
            setErrors((prev) => ({
                ...prev,
                password: "Password cannot be empty."
            }))
            valid = false
        }

        return valid;
    }

    const navigate = useNavigate();
    const handleLoginForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        

        await fetch('http://localhost:8000/sanctum/csrf-cookie', {
            credentials: 'include'
        });

        const xsrfToken = decodeURIComponent(
            document.cookie
                .split("; ")
                .find(row => row.startsWith("XSRF-TOKEN="))
                ?.split("=")[1] || ""
        );

        const response = await fetch('http://localhost:8000/api/login', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
                "X-XSRF-TOKEN": xsrfToken
            },
            body: JSON.stringify(loginForm)
        });

        const data = await response.json();

        if (!response.ok) {
            setErrors(data.message);
            return;
        }
        setMessage(data.message);

        setTimeout(() => {
            navigate('/index');
        }, 1000);
    }
    return (
        <>
            <div className="pt-25">
                <div className="w-full md:max-w-4xl mx-auto">
                    <Navbar />

                    <div className="px-10">
                        <div className="flex justify-center items-center">
                            <Briefcase size={50} />
                        </div>
                        <div className="mt-6">
                            <h2 className="text-center">WELCOME BACK</h2>
                            <p className="text-secondary/60 text-xs text-center">Sign in to your BizWise Account</p>
                        </div>
                        <form onSubmit={handleLoginForm}>
                            <div className="mb-3 mt-6">
                                <Input placeholder="Email Address" value={loginForm.email} icon={User} onChange={(e) => setLoginForm({
                                    ...loginForm,
                                    email: e.target.value
                                })}></Input>
                            </div>
                            {errors.email && (
                                <p>Email Address cannot be empty.</p>
                            )}
                            <div className="mt-3">
                                <Input placeholder="Password" value={loginForm.password} type="password" icon={Lock} onChange={(e) => setLoginForm({
                                    ...loginForm,
                                    password: e.target.value
                                })}></Input>
                            </div>
                            {errors.password && (
                                <p>Password cannot be empty.</p>
                            )}
                            <div className="mt-6">

                                <Button className="w-full shadow" >Sign in</Button>
                            </div>
                        </form>
                        <div className="flex items-center gap-3 mt-6">
                            <div className="h-px bg-gray-300 flex-1"></div>
                            <div>
                                <p className="text-sm text-secondary/40">or continue with</p>
                            </div>
                            <div className="h-px bg-gray-300 flex-1"></div>
                        </div>
                        <div className="mt-6 flex items-center gap-4">
                            <div className="rounded border border-black/50 flex-1 p-3 flex items-center gap-3 justify-center">
                                Google <FaGoogle size={15} />
                            </div>
                            <div className="rounded border border-black/50 flex-1 p-3 flex items-center gap-3 justify-center">
                                Facebook <FaFacebook size={15} />
                            </div>
                        </div>
                        <div className="mt-6">
                            <p className="text-center">Don't have an account? <Link to="/register" className="text-primary">Create one.</Link></p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}





export default Login;