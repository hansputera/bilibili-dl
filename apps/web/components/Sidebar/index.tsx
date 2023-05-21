import { Navbar, NavbarProps } from "@mantine/core";
import Brand from "./Brand";
import Footer from "./Footer";
import MainLinks from "./MainLink";

/**
 * Sidebar Component
 * @return {JSX.Element}
 */
export default function Sidebar(props: NavbarProps): JSX.Element {
  return (
    <Navbar height="100%" p="xs" width={{ base: 300 }} {...props}>
      <Navbar.Section mt="xs">
        <Brand />
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <Footer />
      </Navbar.Section>
    </Navbar>
  );
}
