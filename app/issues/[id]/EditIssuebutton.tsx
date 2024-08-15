import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssuebutton = ({issueId}:{issueId:number}) => {
  return (
    <Button>
      <Link
        className="flex gap-2 items-center"
        href={`/issues/${issueId}/edit`}
      >
        <Pencil2Icon />
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditIssuebutton;
  