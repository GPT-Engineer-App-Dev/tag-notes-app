import { Box, Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <VStack spacing={8} align="center" justify="center" height="100vh">
      <Heading>Welcome to GPT Engineer Notes App</Heading>
      <Box>
        <Link to="/notes">Go to Notes</Link>
      </Box>
    </VStack>
  );
};

export default Index;