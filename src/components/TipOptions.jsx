import React from 'react';
import {
  Button, Stack, Text,
} from '@chakra-ui/react';
// import { Link } from 'react-router-dom';

export default function TipOptions() {
  return (
    <Stack direction="column" spacing={4}>
      <Button>
        <Text pr="4">Nice!</Text>
        <Text pr="1">$3.00</Text>
        <Text>(15%)</Text>
      </Button>
      <Button>
        <Text pr="4">You&apos;re Great!</Text>
        <Text pr="1">$3.00</Text>
        <Text>(15%)</Text>
      </Button>
      <Button>
        <Text pr="4">Thank you so much!</Text>
        <Text pr="1">$3.00</Text>
        <Text>(15%)</Text>
      </Button>
    </Stack>
  );
}
