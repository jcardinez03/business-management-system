import { Stepper } from "../components/Stepper";
import { Navbar } from "../layout/Navbar";
import { Button } from "@/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RegisterUser } from "@/pages/register/RegisterUser";
import { RegisterBusiness } from "@/pages/register/RegisterBusiness";
import { RegisterPlan } from "@/pages/register/RegisterPlan";
import api from "../axios";
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
        plan_id: "",
        team_size: ""
    });

    const navigate = useNavigate();
    const handleRegisterForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        await api.get('/sanctum/csrf-cookie');

        try {
            const response = await api.post("/api/register", registerForm);
    
            const data = await response.data;

            setMessage(data.message);

            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch(error) {
            if (error.response) {
                setErrors(error.response.data.errors);
            }
        }


    }
    // STEP
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        if (!validateForm()) {
            return;
        }

        setCurrentStep((prev) => prev + 1);
    }
    const handleBackStep = () => {
        setCurrentStep((prev) => prev - 1);
    }

    // BUSINESS TYPES
    const [businessTypes, setBusinessTypes] = useState([])

    const getBusinessTypes = async () => {
        const response = await api.get('/api/business-types/get')
        const data = await response.json();

        setBusinessTypes(data);
    }

    useEffect(() => {
        getBusinessTypes();
    }, []);
    // ERROR
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let valid = true
        if (currentStep === 1) {
            if (registerForm.full_name === "") {
                setErrors((prev) => ({
                    ...prev,
                    full_name: "Full name is required",
                }))
                valid = false
            }

            if (registerForm.email === "") {
                setErrors((prev) => ({
                    ...prev,
                    email: "Email is required",
                }))
                valid = false
            }

            if (registerForm.password === "") {
                setErrors((prev) => ({
                    ...prev,
                    password: "Password is required",
                }))
                valid = false
            }

            if (registerForm.password !== "" && registerForm.password.length < 8) {
                setErrors((prev) => ({
                    ...prev,
                    password: "Password should be at least 8 characters long",
                }))
                valid = false
            }
        }


        if (currentStep === 2) {
            if (registerForm.business_name === "") {
                setErrors((prev) => ({
                    ...prev,
                    business_name: "Company name required",
                }))
                valid = false
            }

            if (registerForm.business_type === "") {
                setErrors((prev) => ({
                    ...prev,
                    business_type: "Please choose one business type.",
                }))
                valid = false
            }
        }


        if (currentStep === 3) {
            if (registerForm.plan_id === "") {
                setErrors((prev) => ({
                    ...prev,
                    plan_id: "Please choose a plan",
                }))
                valid = false
            }

        }
        return valid;
    }
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
                        handleNextStep={handleNextStep}
                        errors={errors} />
                ) : currentStep === 2 ? (
                    <RegisterBusiness registerForm={registerForm}
                        setRegisterForm={setRegisterForm}
                        handleNextStep={handleNextStep}
                        handleBackStep={handleBackStep}
                        businessTypes={businessTypes}
                        errors={errors} />
                ) : (
                    <RegisterPlan registerForm={registerForm}
                        setRegisterForm={setRegisterForm}
                        handleRegisterForm={handleRegisterForm}
                        handleNextStep={handleNextStep}
                        handleBackStep={handleBackStep}
                        errors={errors}
                        message={message} />
                )
                }
            </div>
        </div>
    )
}
export default Register;