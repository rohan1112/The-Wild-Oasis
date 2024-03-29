import styled from "styled-components";
import LogoutButton from "../features/authentication/LogoutButton";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkButtonToggle from "./DarkButtonToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4px;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkButtonToggle />
      </li>
      <li>
        <LogoutButton />
      </li>
    </StyledHeaderMenu>
  );
}
