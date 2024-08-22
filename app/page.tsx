import React from "react";
import {
  Flex,
  Grid,
} from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

const page = async() => {
  const open=await prisma.issue.count({where:{status:'OPEN'}})
  const inprogress=await prisma.issue.count({where:{status:'IN_PROGRESS'}})
  const closed=await prisma.issue.count({where:{status:'CLOSED'}})
  return (
    // <Flex direction="column" gap="3">
    //   <LatestIssues />
    //   <IssueSummary open={open} inProgress={inprogress} closed={closed} />
    //   <IssueChart open={open} inProgress={inprogress} closed={closed} />
    // </Flex>
    <Grid columns={{initial:"1",md:"2"}} gap="5">
      <Flex direction="column" gap="5">
      <IssueSummary open={open} inProgress={inprogress} closed={closed} />
      <IssueChart open={open} inProgress={inprogress} closed={closed} />

      </Flex>
      <LatestIssues />
    </Grid>
  );
};
 
export default page;
