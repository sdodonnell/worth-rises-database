import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Input,
  Select,
  HStack,
  VStack,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { CompanyData, fetchGoogleSheetsData } from '../../utils/googleSheets';

export default function GoogleSheetsTable() {
  const [data, setData] = useState<CompanyData[]>([]);
  const [filteredData, setFilteredData] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const toast = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID;
        const range = 'Sheet1!A1:M'; // Adjust range based on your sheet
        const fetchedData = await fetchGoogleSheetsData(spreadsheetId!, range);
        setData(fetchedData);
        setFilteredData(fetchedData);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: 'Error loading data',
          description: 'There was an error loading the company data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  useEffect(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sectorFilter) {
      filtered = filtered.filter(item =>
        item.sector.toLowerCase() === sectorFilter.toLowerCase()
      );
    }

    if (stateFilter) {
      filtered = filtered.filter(item =>
        item.state.toLowerCase() === stateFilter.toLowerCase()
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, sectorFilter, stateFilter, data]);

  const uniqueSectors = [...new Set(data.map(item => item.sector))].filter(Boolean);
  const uniqueStates = [...new Set(data.map(item => item.state))].filter(Boolean);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">Company Database</Text>
        
        <HStack spacing={4}>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Select
            placeholder="Filter by Sector"
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
          >
            {uniqueSectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </Select>
          
          <Select
            placeholder="Filter by State"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >
            {uniqueStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </Select>
        </HStack>
      </VStack>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Sector</Th>
              <Th>Type</Th>
              <Th>Location</Th>
              <Th>Revenue</Th>
              <Th>Employees</Th>
              <Th>Prison Labor Revenue</Th>
              <Th>Prison Labor Employees</Th>
              <Th>Prison Labor Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((item, index) => (
              <Tr key={index}>
                <Td>{item.name}</Td>
                <Td>{item.description}</Td>
                <Td>{item.sector}</Td>
                <Td>{item.type}</Td>
                <Td>{`${item.city}, ${item.state}`}</Td>
                <Td>{item.revenue}</Td>
                <Td>{item.employees}</Td>
                <Td>{item.prisonLaborRevenue}</Td>
                <Td>{item.prisonLaborEmployees}</Td>
                <Td>{item.prisonLaborDescription}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
