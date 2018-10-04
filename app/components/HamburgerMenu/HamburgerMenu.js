import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import colors from '../../styles/colors';

const HamburgerMenu = ({ isOpen, onClick }) => (
  <Hamburger className={isOpen ? 'is-active' : ''} onClick={onClick}>
    <span className="line" />
    <span className="line" />
    <span className="line" />
  </Hamburger>
);

HamburgerMenu.propTypes = {
  isOpen: T.bool.isRequired,
  onClick: T.func.isRequired,
};

export default HamburgerMenu;

const Hamburger = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.75;
  }

  .line {
    width: 25px;
    height: 3px;
    background-color: ${colors.primary};
    display: block;
    margin: 5px auto;
    transition: all 0.3s ease-in-out;
  }

  &.is-active {
    .line:nth-child(1),
    .line:nth-child(3) {
      width: 15px;
    }

    .line:nth-child(1) {
      transform: translate(-6px, 2px) rotate(-45deg);
    }

    .line:nth-child(3) {
      transform: translate(-6px, -2px) rotate(45deg);
    }
  }
`;
