import LoadingSpinner from "@/components/ui/Shared/LoadingSpinner";
import useRole from "@/hooks/useRole";
import { Navigate } from "react-router";

const ParticipantRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "participant") return children;
  return <Navigate to="/" replace />;
};

export default ParticipantRoute;