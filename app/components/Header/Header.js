import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
// components
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
// styles
import colors from '../../styles/colors';
import avatar from '../../images/avatar.jpg';

const Header = ({ toggleSidebar, isSidebarOpen }) => (
  <HeaderBlock>
    <BrandBox>
      <h1>HEXA</h1>
      <span>v0.3</span>
    </BrandBox>
    <Navigation>
      <HamburgerMenu onClick={toggleSidebar} isOpen={isSidebarOpen} />
      <Nav>
        <NavLink>
          <span>How to play?</span>
        </NavLink>
        <NavLink>
          <span>ashelkov</span>
          <UserAvatar url={avatar} />
        </NavLink>
      </Nav>
    </Navigation>
  </HeaderBlock>
);

Header.propTypes = {
  isSidebarOpen: T.bool.isRequired,
  toggleSidebar: T.func.isRequired,
};

export default Header;

const HeaderBlock = styled.header`
  height: 60px;
  width: 100%;
  background: white;
  display: flex;
  align-items: center;
`;

const BrandBox = styled.div`
  height: 100%;
  width: 200px;
  background: #f5a212;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;

  h1 {
    font-weight: normal;
    font-size: 20px;
    letter-spacing: 8px;
  }
  span {
    font-size: 12px;
    opacity: 0.75;
  }
`;

const Navigation = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  flex: 1;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NavLink = styled.div`
  color: ${colors.secondaryLight};
  margin-left: 25px;
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;

  span {
    opacity: 0.75;

    &:hover {
      opacity: 1;
    }
  }
`;

const UserAvatar = styled.div`
  width: 35px;
  height: 35px;
  margin-left: 5px;
  border-radius: 50%;
  background-image: url(${props => props.url});
  background-size: cover;
`;
