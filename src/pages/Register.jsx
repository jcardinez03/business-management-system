import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { Stepper } from "../components/Stepper";
import { Navbar } from "../layout/Navbar";
import { User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const steps = [
    { number: 1, label: "Account" },
    { number: 2, label: "Business" },
    { number: 3, label: "Plan" },
];

const register = [
    {
        id: 1,
        label: "Full Name",
        name: "full_name",
        type: "text",
        icon: User,
        placeholder: "Marwin Jade"
    },
    {
        id: 2,
        label: "Email",
        name: "email",
        type: "email",
        icon: Mail,
        placeholder: "email@gmail.com"
    },
    {
        id: 3,
        label: "Password",
        name: "password",
        type: "password",
        icon: Lock,
        placeholder: "Min. of 8 characters"
    }
]


export const Register = () => {
    const [registerForm, setRegisterForm] = useState({
        full_name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    const handleRegisterForm = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerForm)
        });

        const data = await response.json();

        setMessage(data.message);

        setTimeout(() => {
            navigate('/');
        }, 1000);
    }
    return (
        <div className="pt-25">
            <Navbar />
            <div className="container mx-auto w-full md:max-w-4xl px-4">
                <div className="">
                    <Stepper steps={steps} currentStep={1} />
                </div>
                <div className="md:text-center">
                    <p className="text-3xl md:text-4xl font-bold">Create your account</p>
                    <p className="text-secondary/60 text-sm">Start your 14-day free trial, no credit card needed.</p>
                </div>

                <div className="mt-6 w-full md:max-w-xl mx-auto">
                    <form onSubmit={handleRegisterForm}>
                        {register.map((field) => {
                            const Icon = field.icon;

                            return (
                                <div key={field.id} className="mt-4">
                                    <Label htmlFor={field.id}>{field.label}</Label>
                                    <div className="flex flex-row items-center gap-3 shadow py-2 px-4 rounded-lg focus-within:outline focus-within:outline-primary">
                                        <p><Icon className="text-primary/60" /></p>
                                        <Input type={field.type}
                                            placeholder={field.placeholder}
                                            value={registerForm[field.name]}
                                            className="h-10 w-full outline-none"
                                            onChange={(e) => setRegisterForm({
                                                ...registerForm,
                                                [field.name]: e.target.value
                                            })} />
                                    </div>
                                </div>
                            )
                        }
                        )}
                        <div className="mt-6">
                            <Button type="submit" className="w-full hover:bg-light hover:outline-1 hover:text-primary">
                                Continue
                            </Button>
                        </div>

                    </form>
                    <div className="mt-6 text-center">
                        Already have an account? <Link to="/" className="font-semibold text-primary">Sign in</Link>
                    </div>
                    {message && 
                        <div className="mt-6 animate-fade-in duration-500">
                            <p className="text-center text-success">{message}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Register;