import React from 'react';
import { Button, ButtonGroup, styled } from '@mui/material';
import { QuantityPicker } from 'react-qty-picker';


const Component = styled(ButtonGroup)`
margin-top:30px;
`;

const StyledButton = styled(Button)`
border-radius:50%;
`
const GroupedButton = () => {
  return (
    <Component>
      {/* <StyledButton>-</StyledButton>
      <Button disabled>1</Button>
      <StyledButton>+</StyledButton> */}
      <QuantityPicker />

    </Component>
  );
}

export default GroupedButton;
