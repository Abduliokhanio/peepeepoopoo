import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Spacer } from '@chakra-ui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import CircleIcon from './CircleIcon';

export function OrderDetailBox () {
  return (
    <div>
      <Center>
        <Box borderWidth='1px' borderRadius='lg' overflow='' bg='#D9D9D9' w='94.5%' p={4} color='black'>
          <div className = "title of button" >
            <Flex>
              <p style = {{fontSize : "1.2em"}} >{`Order #${props.order_id}`}</p>
              <Spacer />
              <Center>
                <Link to={`/orders/${props.order_id}/edit`}>
                  <Center>
                    <p style = {{fontSize : ".6em"}}>{"View Detail"}</p>
                    <ChevronRightIcon/>
                  </Center>
                </Link>
              </Center>
            </Flex>
          </div>
        </Box>
      </Center>
    </div>
  );
}
