import React from 'react';
import T from 'prop-types';
import I from 'immutable';
// styles
import styled from 'styled-components';

const ColorPicker = ({ palette }) => (
  <ColorPanel>
    {palette.map(color => (
      <SingleColor
        key={color}
        style={{
          backgroundColor: color,
        }}
      />
    ))}
  </ColorPanel>
);

export default ColorPicker;

ColorPicker.propTypes = {
  palette: T.instanceOf(I.List).isRequired,
};

const ColorPanel = styled.div`
  display: flex;
  align-items: center;
`;

const SingleColor = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 20%;
  margin-right: 15px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;
