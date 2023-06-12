import { rem, Box, createStyles, Anchor } from "@mantine/core";
import { useTranslations } from "next-intl";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.sm,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
  anchor: {
    display: "inline-block",
    textDecoration: "none !important",
    fontSize: "12px",
    lineHeight: "12px",
    margin: "0 24px 8px 0",
    color: "#999",
    fontWeight: 600,
  },
  copyright: {
    fontSize: "12px",
    marginTop: "16px",
    display: "block",
    color: "#999",
    fontWeight: 600,
  },
}));

/**
 * Footer Component.
 * @return {JSX.Element}
 */
export default function Footer(): JSX.Element {
  const { classes } = useStyles();
  const t = useTranslations("sidebar.Footer");

  return (
    <Box className={classes.wrapper}>
      <Anchor component={Link} className={classes.anchor} href="/">
        {t("about")}
      </Anchor>
      <Anchor component={Link} className={classes.anchor} href="/">
        {t("contact")}
      </Anchor>
      <Anchor component={Link} className={classes.anchor} href="/">
        {t("getApp")}
      </Anchor>
      <Anchor component={Link} className={classes.anchor} href="/">
        {t("terms")}
      </Anchor>
      <Anchor component={Link} className={classes.anchor} href="/">
        {t("privacy")}
      </Anchor>
      <Anchor component={Link} className={classes.anchor} href="/">
        {t("infringement")}
      </Anchor>
      <span className={classes.copyright}>
        &copy; {new Date().getFullYear()} OpenBstation
      </span>
    </Box>
  );
}
