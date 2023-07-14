import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Stack,
  Title,
  getBreakpointValue,
  em,
} from "@mantine/core";
import { GoogleIcon } from "../Icon/GoogleIcon";
import { useTranslations } from "next-intl";
import { FacebookIcon } from "../Icon/FacebookIcon";
import { TwitterIcon } from "../Icon/TwitterIcon";
import { IconQrcode, IconUser } from "@tabler/icons-react";

/**
 * LoginModal Component.
 * @return {JSX.Element}
 */
export function LoginModal({
  children,
}: {
  children: (open: () => void) => React.ReactNode;
}): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  const t = useTranslations("popup.LoginModal");

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Title order={3} align="center" mb={30}>
          Login OpenBstation
        </Title>
        <Stack
          sx={(theme) => ({
            [`@media (max-width: ${em(
              getBreakpointValue(theme.breakpoints["2xs"])
            )})`]: {
              margin: 0,
            },
            [`@media (min-width: ${em(
              getBreakpointValue(theme.breakpoints["2xs"])
            )})`]: {
              margin: "0 30px",
            },
          })}
        >
          <Button
            leftIcon={<FacebookIcon width="1.3rem" height="1.3rem" />}
            variant="default"
            color="gray"
            radius="sm"
            size="md"
          >
            {t("signIn")} Facebook
          </Button>
          <Button
            leftIcon={<GoogleIcon width="1.3rem" height="1.3rem" />}
            variant="default"
            color="gray"
            radius="sm"
            size="md"
          >
            {t("signIn")} Google
          </Button>
          <Button
            leftIcon={<TwitterIcon width="1.3rem" height="1.3rem" />}
            variant="default"
            color="gray"
            radius="sm"
            size="md"
          >
            {t("signIn")} Twitter
          </Button>
          <Button
            leftIcon={<IconUser />}
            variant="default"
            color="gray"
            radius="sm"
            size="md"
          >
            {t("signIn")} {t("phone")}/email
          </Button>
          <Button
            leftIcon={<IconQrcode />}
            variant="default"
            color="gray"
            radius="sm"
            size="md"
          >
            {t("signIn")} {t("barcode")}
          </Button>
        </Stack>
      </Modal>

      {children(open)}
    </>
  );
}
