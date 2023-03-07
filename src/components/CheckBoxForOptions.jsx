import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Heading, Image, IconButton, Checkbox, CheckboxGroup, Stack, StackDivider, useNumberInput, Flex, Textarea, Text, Box, HStack, Button, Input, Divider
} from '@chakra-ui/react';
import {updateCart, addToCart} from '../context/slices/cartSlice';

function CheckBoxForOptions({modifierGroup}) {
  //react local state
  const [selectedModifiers, setSelectedModifiers] = useState([]);

  //redux
  const dispatch = useDispatch();
  const merchantStoreSelectedProduct = useSelector(state => state.merchant.selectedProduct);

  useEffect(() => {
  });
  
  const modifierGroupRequired = (modifierGroup) => {
    if (modifierGroup.required) return (
      <Box bg="gray.100" borderRadius={'md'} px={2} py={1}>
        <Text fontSize={'xs'} color="gray.500" >Required</Text>
      </Box>
    );
    return null;
  };

  const modifierGroupDescription = (modifierGroup) => {
    if (modifierGroup.select_count === 1) return (<Text>Select one</Text>);
    else if (modifierGroup.select_count >= 2) return (<Text>Select up to {modifierGroup.select_count}</Text>);

    return (<Text>{modifierGroup.description}</Text>);
  };
  const modifierDisableMax = (modifier, modifierGroup) => {
    const selectedModifierCount = selectedModifiers.map(selectedModifier => selectedModifier.modifier_groups_id === modifierGroup.id).length;
    if (selectedModifierCount < modifierGroup.select_max) { return false; }
    if (selectedModifiers.filter(item => item.id === modifier.id).length === 0) { return true;}
    return false;
  };

  const handleCheckboxChange = (e, modifier, modifierGroup) => {

    if (e.target.checked) {
      setSelectedModifiers([...selectedModifiers, modifier]);
      const selectedModifierCount = selectedModifiers.map(selectedModifier => selectedModifier.modifier_groups_id === modifierGroup.id).length;
      if (selectedModifierCount < modifierGroup.select_max) {
        setSelectedModifiers([...selectedModifiers, modifier]);
        let cartItemUpdate = { 
          id: merchantStoreSelectedProduct.id, 
          items: merchantStoreSelectedProduct.item, 
          quantity: 1, 
          modifiersGroup: [modifierGroup],
          modifiers: [...selectedModifiers, modifier], 
          specialRequest: '',
          status: 'pending',
        };
        dispatch(updateCart(cartItemUpdate));
      } 
    } 
    else{
      setSelectedModifiers(selectedModifiers.filter(e => e.name != modifier.name));
      let cartItemUpdate = { 
        id: merchantStoreSelectedProduct.id, 
        items: merchantStoreSelectedProduct.item, 
        quantity: 1, 
        modifiersGroup: [modifierGroup],
        modifiers: selectedModifiers, 
        specialRequest: '',
        status: 'pending',
        deselectThis: modifier,
        deselectThisGroup: modifierGroup
      };

      dispatch(updateCart(cartItemUpdate));
    }
  };

  return (
    <>
      <Box key={modifierGroup.id} mb='4'>
        <Box py="4" px="6" mb="2" bg="gray.50">
          <Flex alignItems={'center'} justifyContent='space-between' mb={1}>
            <Heading size={'md'}>{modifierGroup.name}</Heading>
            {modifierGroupRequired(modifierGroup)}
          </Flex>
          {modifierGroupDescription(modifierGroup)}
        </Box>
        <CheckboxGroup>
          <Stack 
            direction='column' 
            px="6"
            divider={<StackDivider borderColor='gray.200' />}>
            {modifierGroup?.modifiers?.map(modifier => (
              <React.Fragment key={modifier.id}>
                <Checkbox
                  id={`checkbox_${modifierDisableMax(modifier, modifierGroup)}`}
                  isDisabled={modifierDisableMax(modifier, modifierGroup)}
                  onChange={(e) => handleCheckboxChange(e, modifier, modifierGroup)}
                  py="3"
                  value={modifier.name}>
                  {modifier.name}
                </Checkbox>
              </React.Fragment>
            ))}
          </Stack>
        </CheckboxGroup>
      </Box>
    </>
  );
}

export default CheckBoxForOptions;