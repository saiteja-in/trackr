import React from "react";
import Pagination from "./components/Pagination";
import { AlertDialog, Avatar, Badge, Blockquote, Box, Button, Checkbox, Code, Flex, IconButton, Popover, Text, TextArea } from "@radix-ui/themes";
import { ChatBubbleIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import LatestIssues from "./LatestIssues";

const page = ({ searchParams }: { searchParams: { page: string } }) => {
  return (
    <Flex direction="column" gap="3">
      <Text size="5">The quick brown fox jumps over the lazy dog.</Text>
      <Code>console.log("Hello Nextjs")</Code>
      <Blockquote>
        Perfect typography is certainly the most elusive of all arts. Sculpture
        in stone alone comes near it in obstinacy.
      </Blockquote>
 

<Flex gap="2">
  <Badge color="orange">In progress</Badge>
  <Badge color="blue">In review</Badge>
  <Badge color="green">Complete</Badge>
</Flex>
<IconButton>
  <MagnifyingGlassIcon width="18" height="18" />
</IconButton>
<Popover.Root>
  <Popover.Trigger>
    <Button variant="soft">
      <ChatBubbleIcon width="16" height="16" />
      Comment
    </Button>
  </Popover.Trigger>
  <Popover.Content width="360px">
    <Flex gap="3">
      <Avatar
        size="2"
        src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
        fallback="A"
        radius="full"
      />
      <Box flexGrow="1">
        <TextArea placeholder="Write a comment…" style={{ height: 80 }} />
        <Flex gap="3" mt="3" justify="between">
          <Flex align="center" gap="2" asChild>
            <Text as="label" size="2">
              <Checkbox />
              <Text>Send to group</Text>
            </Text>
          </Flex>

          <Popover.Close>
            <Button size="1">Comment</Button>
          </Popover.Close>
        </Flex>
      </Box>
    </Flex>
  </Popover.Content>
</Popover.Root>

<LatestIssues />
    </Flex>
  );
};

export default page;
