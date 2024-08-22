import React from "react";
import {
  Flex,
} from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

const page = async() => {
  const open=await prisma.issue.count({where:{status:'OPEN'}})
  const inprogress=await prisma.issue.count({where:{status:'IN_PROGRESS'}})
  const closed=await prisma.issue.count({where:{status:'CLOSED'}})
  return (
    <Flex direction="column" gap="3">
      <LatestIssues />
      <IssueSummary open={open} inProgress={inprogress} closed={closed} />
    </Flex>
  );
};

export default page;
