import { Stepper } from "../components/Stepper";
import { Navbar } from "../layout/Navbar";

const steps = [
    { number: 1, label: "Account" },
    { number: 2, label: "Business" },
    { number: 3, label: "Plan" },
];
export const Register = () => {
    return (
        <div className="pt-25">
            <Navbar />
            <div className="container mx-auto w-full px-4">
                <Stepper steps={steps} currentStep={1} />
            </div>
        </div>
    )
}

export default Register;