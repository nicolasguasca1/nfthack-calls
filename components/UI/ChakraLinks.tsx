import Link, { LinkProps } from "next/link";
import {
  Button,
  ButtonProps,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps
} from "@chakra-ui/react";

type ChakraAndNextProps = ButtonProps & LinkProps;
type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps;

function ChakraNextLinkButton({
  href,
  children,
  prefetch = true,
  ...props
}: ChakraAndNextProps) {
  return (
    <Link href={href} passHref>
      <Button as="a" {...props}>
        {children}
      </Button>
    </Link>
  );
}

function ChakraNextLink({ href, children, ...props }: ChakraLinkAndNextProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </Link>
  );
}

export { ChakraNextLinkButton, ChakraNextLink };
