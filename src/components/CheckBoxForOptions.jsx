import React, { useState, useEffect } from 'react';
import {
  Heading, Image, IconButton, Checkbox, CheckboxGroup, Stack, StackDivider, useNumberInput, Flex, Textarea, Text, Box, HStack, Button, Input, Divider
} from '@chakra-ui/react';

function CheckBoxForOptions({modifierGroup}) {

  const [selectedModifiers, setSelectedModifiers] = useState([]);

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
    if (selectedModifierCount < modifierGroup.select_max) {
      return false;
    }
    // TODO: SET TRUE IF MODIFER IS IN MODIFIER GROUP
    if (selectedModifiers.filter(item => item.id === modifier.id).length === 0) {
      return true;
    }
    return false;
  };

  const handleCheckboxChange =  (e, modifier, modifierGroup) => {
    const selectedModifierCount = selectedModifiers.map(selectedModifier => selectedModifier.modifier_groups_id === modifierGroup.id).length;

    if (e.target.checked) {
      if (selectedModifierCount < modifierGroup.select_max) {
        setSelectedModifiers([...selectedModifiers, {
          ...modifier, isChecked: true
        }]);
      } 
    } else {
      setSelectedModifiers(selectedModifiers.filter(item => item.id !== modifier.id));
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
            {modifierGroup?.modifiers?.map(modifier => {
              return(
                <Checkbox 
                  isDisabled={modifierDisableMax(modifier, modifierGroup)}
                  onChange={(e) => handleCheckboxChange(e, modifier, modifierGroup)}
                  py="3" 
                  key={modifier.id} 
                  value={modifier.name}>{modifier.name}</Checkbox>
              );  
            })}
          </Stack>
        </CheckboxGroup>
      </Box>
    </>
  );
}

export default CheckBoxForOptions;