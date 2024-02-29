import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuthentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.removeQueries(); //No arguments means removing all the queries from the cache
      navigate("/login", { replace: true }); //replace true means you cannot go back after logout you will be redirected to login;
      toast.success("Logout successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logout, isLoading };
}
