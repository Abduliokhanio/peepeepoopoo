import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/Auth';
import { supabasePrivate } from '../../services/supabasePrivate';
import {
  Box, TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tfoot, Tbody
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [false]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabasePrivate
      .from('receipts')
      .select('*')
      .eq('customer_id', user.id)
      .order('created_at', {
        ascending: false 
      });
    setLoading(false);
    if (error) throw error;
    console.log('data: ', data);
    setReceipts(data);
  };

  const displayReceipts = () => {
    return receipts.map(order => {
      const newDate = new Date(order.created_at).toLocaleDateString();
      return (
        <Tr key={order.id}>
          <Td>{newDate}</Td>
          <Td>{order.merchant}</Td>
          <Td>{order.order_type}</Td>
          <Td>{order.total_cost}</Td>
        </Tr>
      );
    });
  };

  return (
    <Box>
      <Navbar title="Receipts" showBackButton={true} />
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Merchant</Th>
              <Th>Type</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayReceipts()}
          </Tbody>
        </Table>
      </TableContainer>
    
    </Box>
  );
}
