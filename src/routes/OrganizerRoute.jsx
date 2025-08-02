import LoadingSpinner from "@/components/ui/Shared/LoadingSpinner";
import useRole from "@/hooks/useRole";
import { Navigate } from "react-router";


const OrganizerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  console.log('🔒 OrganizerRoute check');

  if (isRoleLoading) return <LoadingSpinner />;
  if (role === 'organizer') return children;

  return <Navigate to='/' replace />;
};

export default OrganizerRoute;
