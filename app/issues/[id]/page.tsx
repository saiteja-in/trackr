import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";

import EditIssuebutton from "./EditIssuebutton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { Metadata } from "next";
interface Props {
  params: { id: string };
}
//this will directly take the params from the url with id as key
const IssueDetailPage = async ({ params }: Props) => {
  const session= await getServerSession(authOptions)
  if (isNaN(parseInt(params.id))) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <Grid columns={{initial:"1",sm:"5"}} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && <Box>
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
        <EditIssuebutton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>}
      

    </Grid>
  );
};

export default IssueDetailPage;

export const metadata:Metadata={
  title:'Trackr',
  description:'View a summary of project issues'
}
 