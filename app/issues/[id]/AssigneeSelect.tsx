"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60sec
    retry: 3,
  });
  if (isLoading) return <Skeleton />;
  if (error) return null;
  const handleValueChange = async (userId: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId,
      });
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  };
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId ? issue.assignedToUserId:""}
        onValueChange={handleValueChange}
      >
        <Select.Trigger placeholder="Assign to user" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {/* <Select.Item value="">Unassigned</Select.Item> */}
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
