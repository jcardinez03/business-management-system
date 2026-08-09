import { Stepper } from "../components/Stepper";
import { Navbar } from "../layout/Navbar";
import { Button } from "@/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegisterUser } from "@/pages/register/RegisterUser";
import { RegisterBusiness } from "@/pages/register/RegisterBusiness";
import { RegisterPlan } from "@/pages/register/RegisterPlan";
const steps = [
    { number: 1, label: "Account" },
    { number: 2, label: "Business" },
    { number: 3, label: "Plan" },
];



export const Register = () => {
    const [message, setMessage] = useState("");
    const [registerForm, setRegisterForm] = useState({
        full_name: "",
        email: "",
        password: "",
        business_name: "",
        business_type: "",
        plan:"",
        team_size: ""
    });
    const navigate = useNavigate();
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
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep((prev) => prev + 1);
    }
    const handleBackStep = () => {
        setCurrentStep((prev) => prev - 1);
    }
    console.log(registerForm)
    return (
        <div className="pt-25">
            <Navbar />
            <div className="container mx-auto w-full md:max-w-4xl px-4">
                <div className="">
                    <Stepper steps={steps} currentStep={currentStep} />
                </div>
            </div>
            <div className="px-16 mt-6">
                {currentStep === 1 ? (
                    <RegisterUser registerForm={registerForm}
                        setRegisterForm={setRegisterForm}
                        handleRegisterForm={handleRegisterForm}
                        handleNextStep={handleNextStep} />
                ) : currentStep === 2 ? (
                    <RegisterBusiness registerForm={registerForm}
                        setRegisterForm={setRegisterForm}
                        handleRegisterForm={handleRegisterForm}
                        handleNextStep={handleNextStep}
                        handleBackStep={handleBackStep} />
                ) : (
                    <RegisterPlan registerForm={registerForm}
                        setRegisterForm={setRegisterForm}
                        handleRegisterForm={handleRegisterForm}
                        handleNextStep={handleNextStep}
                        handleBackStep={handleBackStep} />
                )
                }
            </div>
        </div>
    )
}
export default Register;