import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import colors from '../../styles/colors';

const Button = ({ children, ...props }) => (
  <CustomButton {...props}>{children}</CustomButton>
);

export default Button;

Button.propTypes = {
  children: T.oneOfType([T.node, T.element]),
};

const CustomButton = styled.button`
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  outline: none;

  color: ${colors.primary};
  background-color: transparent;
  border-color: #f6a821;
  min-width: 120px;

  &:hover {
    color: #ffffff;
    background-color: rgba(246, 168, 33, 0.1);
    border-color: #f6a821;
  }
`;
