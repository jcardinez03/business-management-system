import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { useState } from "react";
const plans = [
    {
        id: 1,
        name: "Starter",
        description: "Up to 3 users with essential features",
        price: "Free"
    },
    {
        id: 2,
        name: "Pro",
        description: "Up to 10 users with additional features",
        price: 799
    },
    {
        id: 3,
        name: "Enterprise",
        description: "Multiple users with multi-branch support, advanced reports, role management and more",
        price: 1999

    },
]

export const RegisterPlan = ({ handleRegisterForm, registerForm, setRegisterForm, errors, message }) => {
    const [isChecked, setIsChecked] = useState(false);
    console.log(isChecked);

    const handleIsChecked = () => {
        setIsChecked((prev) => (!prev));
    }
    return (
        <>
            <div className="mx-auto md:max-w-lg w-full">


                <div className="md:text-center">
                    <p className="text-3xl md:text-4xl font-bold">Choose a plan</p>
                    <p className="text-secondary/60 text-sm">Change or cancel any time.</p>
                </div>

                <div className="mx-auto mt-6 flex flex-col justify-center gap-3">
                    {plans.map((plan) =>
                        <button className="border border-black/30 flex flex-row items-center rounded-xl h-35 md:h-25 px-6 py-0 focus:outline outline-primary text-start"
                            onClick={() => setRegisterForm({
                                ...registerForm,
                                plan_id: plan.id
                            })}
                            key={plan.id}>
                            <div className="flex-2">
                                <p className="font-bold text-xl">{plan.name}</p>
                                <p className="text-xs text-secondary/60">{plan.description}</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-end text-xl md:text-xl font-bold">
                                    {plan.id === 1 ?
                                        "" : "₱ "
                                    }
                                    {plan.price}
                                </p>
                            </div>
                        </button>
                    )}
                    {errors.plan && 
                        <p className="fw-bold text-danger animate-fade-in">{errors.plan}</p>
                        }
                </div>
                <div className="mt-6 flex flex-row gap-3 items-center">
                    <Checkbox className="w-4 h-4 rounded border-gray-300 shadow-sm checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-300" onChange={(e) => setIsChecked(e.target.checked)} />
                    <p className="text-xs text-gray-500">I agree to the <span className="text-primary font-semibold">Terms of Service</span> and <span className="text-primary font-semibold">Privacy Policy</span></p>
                </div>
                <form onSubmit={handleRegisterForm}>
                    <div className="mt-6 transition-all duration-300">
                        <Button className="w-full disabled:bg-blue-200 disabled:text-gray-200" disabled={!isChecked}>Create Account</Button>
                    </div>
                </form>
                {message && (
                    <div className="mt-6">
                        <p className="animate-fade-in text-success">{message}</p>
                    </div>
                )
                }
            </div>
        </>
    )
}