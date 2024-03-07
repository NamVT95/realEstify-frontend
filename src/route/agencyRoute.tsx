import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AgencyRouteProps {
    children: React.ReactNode
}

export default function AgencyRoute({ children }: AgencyRouteProps) {

    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!localUser) {
        toast.error("You are not authorized to access this page");
        return <Navigate to="/login" />;
    } else {
        if (localUser.Role !== "agency") {
            toast.error("You are not authorized to access this page");
            return <Navigate to="/login" />;
        }
    }

    return (
        <div>
            {children}
        </div>
    )
}
