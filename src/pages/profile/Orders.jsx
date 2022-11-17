import * as React from 'react';
import {
  VStack, Link, Stack, Button, StackDivider, useDisclosure, Heading, Flex, Text, Spacer,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import OrderLoadingBox from '../../components/OrderLoadingBox';
import { OrderDetailBox } from '../../components/OrderDetailBox';

export default function Orders() {
  return (
    <div>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        align="stretch"
        px="6"
      >
        <Stack>
          <Navbar title="View Orders" navType="orders" />
          <h5 style={{paddingLeft: '2.4rem'}} >Coming Up</h5>
          <OrderLoadingBox order_id = {1234} />
        </Stack>
        <Stack>
          <h5 style={{paddingLeft: '2.4rem'}} >Completed This Visit</h5>
          <OrderDetailBox order_id = {5678} />
          <OrderDetailBox order_id = {9101112} />
        </Stack>
      </VStack>
    </div>
  );
}
