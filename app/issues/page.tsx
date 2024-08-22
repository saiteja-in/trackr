import prisma from "@/prisma/client";
import { Button, Flex, Table } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueActions from "./new/IssueActions";
import Link from "../components/Link";

import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";
import IssueTable, { columnName } from "./IssueTable";
import { Metadata } from "next";

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

  // const columns: { label: string; value: keyof Issue; className?: string }[] = [
  //   { label: "Issue", value: "title" },
  //   { label: "Status", value: "status", className: "hidden md:table-cell" },
  //   {
  //     label: "Created At",
  //     value: "createdAt",
  //     className: "hidden md:table-cell",
  //   },
  // ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where={status}

  const orderBy = columnName
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
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </Flex>
  );
};

export default IssuesPage;

export const metadata:Metadata={
  title:'Trackr - Issue List',
  description:'View a summary of project issues'
}
