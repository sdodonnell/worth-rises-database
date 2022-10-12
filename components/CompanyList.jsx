import React from 'react';
import { Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

const CompanyList = ({ companyNames, companyRecords }) =>
  companyNames && Array.isArray(companyNames) ? (
    companyNames.map((company, i) => (
      <Link key={`company-list-${company}`} as={NextLink} href={`/?id=${companyRecords[i]}&link=1`} shallow>
        <Text _hover={{ textDecor: 'underline', cursor: 'pointer' }} as="span">
          {company}
          {i < companyNames.length - 1 ? '; ' : ''}
        </Text>
      </Link>
    ))
  ) : (
    <Text textAlign="center">--</Text>
  );

export default CompanyList;
