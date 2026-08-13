import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useState } from "react";
import { Briefcase } from "lucide-react";

const icon = Briefcase
export const RegisterBusiness = ({ registerForm, setRegisterForm, handleNextStep, errors, businessTypes }) => {

    return (
        <>
            <div className="md:text-center">
                <p className="text-3xl md:text-4xl font-bold">About your business</p>
                <p className="text-secondary/60 text-sm">Help us personalise your experience</p>
            </div>

            <div className="w-full md:max-w-lg mx-auto">
                <Label>
                    Company Name
                </Label>
                
                <Input className="h-10 w-full outline-none" onChange={(e) => setRegisterForm({
                    ...registerForm,
                    business_name: e.target.value
                })} icon={icon} />
               
                {errors.business_name &&
                    <p className="fw-bold text-danger animate-fade-in">{errors.business_name}</p>
                }
                <div className="grid grid-cols-2 gap-4 mt-6">
                    {businessTypes.map((business) =>
                        <div key={business.id} className={`shadow-sm text-center rounded-xl py-3 px-3 hover:bg-primary hover:text-light cursor-pointer ${registerForm.business_type === business.id ?
                            "bg-light text-primary outline outline-primary" :
                            "border border-black/20"
                            }`}>
                            <button type="button" value={business.id} onClick={() => setRegisterForm({
                                ...registerForm,
                                business_type: business.id
                            })}>
                                {business.name}
                            </button>
                        </div>
                    )}
                </div>
                <div className="mt-2">
                    {errors.business_type && (
                        <p className="fw-bold text-danger animate-fade-in">{errors.business_type}</p>
                    )}
                </div>

                <div className="mt-6">
                    <Button className="w-full" onClick={handleNextStep} registerForm={registerForm} setRegisterForm={setRegisterForm}>
                        Continue
                    </Button>
                </div>
            </div>

        </>
    )
} 