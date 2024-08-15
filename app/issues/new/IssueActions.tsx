import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueActions = () => {
  return (
    <div className='mb-5'>
    <Button><Link href="/issues/new" >Home</Link></Button>
  </div>
  )
}

export default IssueActions
