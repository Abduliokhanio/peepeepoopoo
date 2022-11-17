import * as React from 'react';
import { Badge, Box, Center, Flex, Grid, Icon, Image, Spacer } from '@chakra-ui/react';
import CircleIcon from './CircleIcon';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default function OrderLoadingBox({props}) {

  return (
    <div>
      <Center>
        <Box borderWidth='1px' borderRadius='lg' overflow='' bg='#D9D9D9' w='94.5%' p={4} color='black'>
          <div className = "title of button" >
            <Center>
              <p style = {{
                fontSize : '1.2em'
              }}>{`Order #${props.order_id}`}</p><br/>
            </Center>
          </div>
          <div className = "loading circles" >
            <Grid templateColumns='repeat(4, 1fr)' gap={5}>
              <CircleIcon status = "Received" iconStatus = {true} color = "#0080D3"/>
              <CircleIcon status = "Preparing" iconStatus = {false} color = "Black"/>
              <CircleIcon status = "Ready" iconStatus = {false} color = "Black"/> 
              <CircleIcon status = "Completed" iconStatus = {false} color = "Black"/> 
            </Grid>
          </div> 
          <Flex>
            <Spacer/>
            <Link to={`/orders/${props.order_id}/edit`}>
              <Center>
                <p style = {{
                  fontSize : '.6em'
                }}>{'View Detail'}</p>
                <ChevronRightIcon/>
              </Center>
            </Link>
          </Flex>
          
        </Box>
      </Center>
    </div>
  );
}
