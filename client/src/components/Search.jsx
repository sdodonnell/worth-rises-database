import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';

export default function Search({ searchTerm, setSearchTerm }) {
  const [value, setValue] = useState(searchTerm);
  const handleChange = (e) => setValue(e.target.value);
  const handleClick = (e) => setSearchTerm(value);

  return (
    <InputGroup maxWidth={350} borderColor="purple.100">
      <Input value={value} placeholder="Enter Keyword" onChange={handleChange} />
      <InputRightElement width="4.5rem" p=".3rem">
        <Button h="1.75rem" size="sm" onClick={handleClick} bgColor="purple.100" color="black">
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
