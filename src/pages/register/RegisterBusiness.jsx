import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Briefcase } from "lucide-react";

const businessType = [
    {
        id: 1,
        name: "Retail"
    },
    {
        id: 2,
        name: "Manufacturing"
    },
    {
        id: 3,
        name: "Services"
    },
    {
        id: 4,
        name: "E-commerce"
    },
    {
        id: 5,
        name: "Wholesale"
    },
    {
        id: 6,
        name: "Other"
    },
];


export const RegisterBusiness = ({registerForm, setRegisterForm, handleNextStep }) => {

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
                <div className="flex flex-row items-center gap-3 shadow py-2 px-4 rounded-lg focus-within:outline focus-within:outline-primary">
                    <p><Briefcase /></p>
                    <Input className="h-10 w-full outline-none" onChange={(e) => setRegisterForm({
                        ...registerForm,
                        business_name: e.target.value
                    })}/>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    {businessType.map((business) =>
                        <button key={business.id} type="button" value={business.name} onClick={()=>setRegisterForm({
                            ...registerForm,
                            business_type:business.name
                        })} className={`shadow-sm text-center rounded-xl py-3 hover:bg-primary hover:text-light cursor-pointer ${registerForm.business_type === business.name ? 
                            "bg-light text-primary outline outline-primary":
                            "border border-black/20"
                        }`}>
                            {business.name}
                        </button>
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