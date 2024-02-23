import { useNavigate } from "react-router-dom";

export function useMoveBack() {
  const navigate = useNavigate();
  const moveback = () => {
    navigate(-1);
  };
  return moveback;
}
