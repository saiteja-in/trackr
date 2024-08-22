import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueActions from "./new/IssueActions";
import Link from "../components/Link";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    orderDirection?: "asc" | "desc";
    page:string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  console.log(searchParams.status);

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where={status}

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.orderDirection || "asc" }
    : undefined;

  const page=parseInt(searchParams.page) || 1;
  const pageSize=10;


  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip:(page-1)*pageSize,
    take:pageSize
  });
  const issueCount=await prisma.issue.count({where})

  return (
    <div>
      <IssueActions />
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
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </div>
  );
};

export default IssuesPage;
