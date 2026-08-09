import { Check } from "lucide-react";
export const Stepper = ({ steps, currentStep }) => {
    return (
        <div className="flex items-center">
            {steps.map((step, index) =>
                <div key={step.number} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                            ${step.number < currentStep ?
                            "bg-green-600 text-white" : 
                            step.number === currentStep ?
                            "bg-blue-600 text-white" :
                            "bg-gray-200 text-gray-500"}`}>
                            {step.number < currentStep ?
                                <Check size={19}/> : step.number
                            }
                        </div>
                        <span className={`mt-2 text-sm ${step.number === currentStep ?
                            "text-blue-600" :
                            "text-gray-400"}`}>
                            {step.label}
                        </span>
                    </div>
                            
                    {index < steps.length - 1 && (
                        <div className="flex-1 h-px bg-gray-200 mx-2"></div>
                    )}
                </div>
            )}
        </div>
    )
}