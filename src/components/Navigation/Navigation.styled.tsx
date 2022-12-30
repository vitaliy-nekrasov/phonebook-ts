import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Header = styled.header`
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: ${(p) => p.theme.borders.fat};
  margin-bottom: 20px;
`;
export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StyledLinkContacts = styled(NavLink)`
  text-decoration: none;
  display: inline-block;
  padding: ${(p) => p.theme.space[3]} ${(p) => p.theme.space[4]};
  line-height: 42px;
  border: ${(p) => p.theme.borders.normal};
  border-radius: ${(p) => p.theme.space[5]};
  font-size: ${(p) => p.theme.space[4]};
  text-transform: uppercase;
  text-align: center;
  letter-spacing: ${(p) => p.theme.space[2]};
  font-weight: ${(p) => p.theme.fontWeights.semiBold};
  color: ${(p) => p.theme.colors.black};
  background: ${(p) => p.theme.colors.white};
  transition: 0.3s;
  cursor: pointer;
  margin-right: ${(p) => p.theme.space[5]};
  &:hover,
  &:focus {
    background: ${(p) => p.theme.colors.green};
  }
  &.active {
    background: ${(p) => p.theme.colors.green};
  }
  @media screen and (max-width: 768px) {
    margin-right: 0;
    margin-bottom: ${(p) => p.theme.space[2]};
  }
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  display: inline-block;
  padding: ${(p) => p.theme.space[3]} ${(p) => p.theme.space[4]};
  line-height: ${(p) => p.theme.space[5]};
  border: ${(p) => p.theme.borders.normal};
  border-radius: ${(p) => p.theme.space[5]};
  font-size: ${(p) => p.theme.space[4]};
  text-transform: uppercase;
  text-align: center;
  letter-spacing: ${(p) => p.theme.space[2]};
  font-weight: ${(p) => p.theme.fontWeights.semiBold};
  color: ${(p) => p.theme.colors.black};
  background: ${(p) => p.theme.colors.white};
  transition: 0.3s;
  @media screen and (max-width: 768px) {
    width: 90px;
    letter-spacing: ${(p) => p.theme.space[1]};
    font-size: ${(p) => p.theme.space[4]};
  }
  cursor: pointer;
  &:hover,
  &:focus {
    background: ${(p) => p.theme.colors.green};
  }
  &.active {
    background: ${(p) => p.theme.colors.green};
  }
  &:not(:last-child) {
    margin-right: ${(p) => p.theme.space[3]};
    @media screen and (max-width: 768px) {
      margin-bottom: ${(p) => p.theme.space[2]};
      margin-right: ${(p) => p.theme.space[0]};
    }
  }
`;

export const Title = styled.h1``;
export const Wrapper = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LinkWrapper = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
