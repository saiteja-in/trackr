"use client";
import Link from "next/link";
import { PiBugDroidFill } from "react-icons/pi";
import React from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  console.log(currentPath);
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className=" border-b mb-5 px-5 h-14 py-4">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <PiBugDroidFill className="text-2xl text-red-500" />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classnames({
                      'text-violet-800 font-medium':link.href===currentPath,
                      'text-violet-400 font-medium':link.href!==currentPath,
                      'hover:text-violet-800 transition-colors':true
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status==="loading" && <Skeleton width="3rem" />}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    className="cursor-pointer"
                    radius="full"
                    referrerPolicy="no-referrer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                    <Link href="/api/auth/signout">
                  <DropdownMenu.Item>
                    Log out
                  </DropdownMenu.Item>
                    </Link>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link className="nav-link" href="/api/auth/signin">Log in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
