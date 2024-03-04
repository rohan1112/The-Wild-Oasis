import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export default function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast.success("User created Sucessfully ! Please Verify your account");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isSigningUp };
}
