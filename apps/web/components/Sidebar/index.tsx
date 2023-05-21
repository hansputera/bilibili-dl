import { Navbar, NavbarProps } from "@mantine/core";
import Footer from "./Footer";
import MainLinks from "./MainLink";

/**
 * Sidebar Component
 * @param {NavbarProps} props Navbar Props.
 * @return {JSX.Element}
 */
export default function Sidebar(props: NavbarProps): JSX.Element {
  return (
    <Navbar height="100%" p="xs" width={{ base: 300 }} {...props}>
      <Navbar.Section grow>
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <Footer />
      </Navbar.Section>
    </Navbar>
  );
}
