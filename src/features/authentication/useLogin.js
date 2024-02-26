import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuthentication";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: loginUser, isLoading: isLogging } = useMutation({
    mutationFn: (loginData) => login(loginData),
    onSuccess: () => {
      toast.success("Successfully logged in");
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { loginUser, isLogging };
}
