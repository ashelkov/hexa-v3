import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import colors from '../../styles/colors';

const Sidebar = ({ isOpen }) => (
  <Aside isOpen={isOpen}>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
      <li>Item 5</li>
    </ul>
  </Aside>
);

Sidebar.propTypes = {
  isOpen: T.bool.isRequired,
};

export default Sidebar;

const Aside = styled.aside`
  background-color: ${colors.secondaryDark};
  color: ${colors.text};
  position: absolute;
  width: 200px;
  height: calc(100vh - 60px);
  padding: 10px 20px;
  transition: transform 0.3s ease;

  ${props =>
    !props.isOpen &&
    `
    transform: translate(-100%);
  `} ul {
    padding: 0;
    margin: 20px 0;
    list-style: none;

    li {
      margin-bottom: 5px;

      &:hover {
        cursor: pointer;
        color: white;
      }
    }
  }
`;
