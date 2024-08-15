import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React from 'react'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton width="5 rem"/>
      <Flex className="space-x-3" my="2">
        <Skeleton width="5 rem"/>
        <Skeleton width="8 rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage
