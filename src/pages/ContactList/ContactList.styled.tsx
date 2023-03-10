import styled from "styled-components";

export const List = styled.ol`
  margin-left: ${(p) => p.theme.space[4]};
  @media screen and (max-width: 768px) {
    margin-left: 0;
    padding-left: 0;
  }
`;
export const Item = styled.li`
  font-size: ${(p) => p.theme.fontSizes.s};
  margin-bottom: ${(p) => p.theme.space[3]};
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
export const Text = styled.p`
  display: inline-flex;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: ${(p) => p.theme.space[3]};
  @media screen and (max-width: 768px) {
    margin-bottom: ${(p) => p.theme.space[3]};
  }
`;
export const Button = styled.button`
  text-decoration: none;
  display: inline-block;
  padding: ${(p) => p.theme.space[2]} ${(p) => p.theme.space[3]};
  line-height: ${(p) => p.theme.space[4]};
  border: ${(p) => p.theme.borders.normal};
  border-radius: ${(p) => p.theme.space[5]};
  font-size: 11px;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: ${(p) => p.theme.space[2]};
  font-weight: ${(p) => p.theme.fontWeights.semiBold};
  color: ${(p) => p.theme.colors.black};
  background: ${(p) => p.theme.colors.white};
  transition: 0.3s;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 280px;
  }
  &:hover,
  &:focus {
    background: ${({ children, theme }) => {
      switch (children) {
        case "Delete": {
          return theme.colors.red;
        }
        case "Change contact": {
          return theme.colors.yellow;
        }
        default:
          return theme.colors.white;
      }
    }};
  }
  &:not(:last-child) {
    margin-right: ${(p) => p.theme.space[3]};
    @media screen and (max-width: 768px) {
      margin-bottom: ${(p) => p.theme.space[2]};
      margin-right: 0;
    }
  }
`;

export const AddButton = styled.button`
  margin-bottom: ${(p) => p.theme.space[4]};
  text-decoration: none;
  display: inline-block;
  padding: ${(p) => p.theme.space[3]} ${(p) => p.theme.space[4]};
  line-height: ${(p) => p.theme.space[4]};
  border: ${(p) => p.theme.borders.normal};
  border-radius: ${(p) => p.theme.space[5]};
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: ${(p) => p.theme.space[2]};
  font-weight: ${(p) => p.theme.fontWeights.semiBold};
  color: ${(p) => p.theme.colors.black};
  background: ${(p) => p.theme.colors.white};
  transition: 0.3s;
  cursor: pointer;
  &:hover,
  &:focus {
    background: ${(p) => p.theme.colors.green};
  }
`;
