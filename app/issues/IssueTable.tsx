import { Table } from '@radix-ui/themes';
import React from 'react'
import NextLink from "next/link";
import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import IssueStatusBadge from '../components/IssueStatusBadge';

interface Props {
    searchParams: {
      status: Status;
      orderBy: keyof Issue;
      orderDirection?: "asc" | "desc";
      page:string;
    };
    issues:Issue[]
  }
  

const IssueTable = ({searchParams,issues}:Props) => {

    
 
  return (
    <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              const isCurrentOrderColumn =
                column.value === searchParams.orderBy;
              const nextOrderDirection =
                isCurrentOrderColumn && searchParams.orderDirection === "asc"
                  ? "desc"
                  : "asc";

              return (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <NextLink
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                        orderDirection: nextOrderDirection,
                      },
                    }}
                  >
                    {column.label}
                  </NextLink>
                  {isCurrentOrderColumn &&
                    (searchParams.orderDirection === "asc" ? (
                      <ArrowUpIcon className="inline" />
                    ) : (
                      <ArrowDownIcon className="inline" />
                    ))}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
  )
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  export const columnName=columns.map(column=>column.value)

export default IssueTable
