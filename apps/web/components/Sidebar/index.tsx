import { Navbar, NavbarProps } from "@mantine/core";
import Following from "./Following";
import Footer from "./Footer";
import MainLinks from "./MainLink";

/**
 * Sidebar Component
 * @param {NavbarProps} props Navbar Props.
 * @return {JSX.Element}
 */
export default function Sidebar(props: NavbarProps): JSX.Element {
  return (
    <Navbar p="xs" width={{ base: 300 }} {...props}>
      <Navbar.Section>
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section grow>
        <Following />
      </Navbar.Section>
      <Navbar.Section>
        <Footer />
      </Navbar.Section>
    </Navbar>
  );
}
