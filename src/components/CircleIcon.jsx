import { CheckIcon } from '@chakra-ui/icons';
import { Center, Circle, Icon } from '@chakra-ui/react';
import * as React from 'react';

export default function CircleIcon() {

  return (
    <div>
      <Center>
        <Circle size='10px' bg={props.color}/>
      </Center>
      <Center>
        <p style={{ fontSize : ".8em",color: `${props.color}` }}>{props.status}</p>
      </Center>

      {props.iconStatus ?
        <Center>
          <CheckIcon color={props.color} />
        </Center>
        :
        null}
    </div>
  );
}
