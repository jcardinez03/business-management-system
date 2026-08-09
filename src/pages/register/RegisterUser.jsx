import { User, Mail, Lock } from "lucide-react";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";
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

export const RegisterUser = ({registerForm, setRegisterForm, handleRegisterForm, handleNextStep}) => {

    return (
        <>
            <div className="md:text-center">
                <p className="text-3xl md:text-4xl font-bold">Create your account</p>
                <p className="text-secondary/60 text-sm">Start your 14-day free trial, no credit card needed.</p>
            </div>

            <div className="mt-6 w-full md:max-w-xl mx-auto">
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
                        <Button type="button" className="w-full hover:bg-light hover:outline-1 hover:text-primary" onClick={handleNextStep}>
                            Continue
                        </Button>
                    </div>
                <div className="mt-6 text-center">
                    Already have an account? <Link to="/" className="font-semibold text-primary">Sign in</Link>
                </div>
            </div>
        </>
    )
}