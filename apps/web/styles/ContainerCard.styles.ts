import { createStyles, getBreakpointValue } from "@mantine/core";

export default createStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(288px, 368px))",
    gridAutoRows: 0,
    gridTemplateRows: "auto auto",
    overflow: "hidden",
    [`@media (min-width: ${getBreakpointValue(theme.breakpoints.xl)}px)`]: {
      gridTemplateColumns: "repeat(5, 1fr)",
      columnGap: "24px",
    },
    // [`@media (min-width: ${getBreakpointValue(theme.breakpoints.lg)}px)`]: {
    //   gridTemplateColumns: "repeat(4, 1fr)",
    //   columnGap: "24px",
    // },
    // [`@media (min-width: ${getBreakpointValue(theme.breakpoints.md)}px)`]: {
    //   gridTemplateColumns: "repeat(3, 1fr)",
    // },
    // [`@media (min-width: ${getBreakpointValue(theme.breakpoints.sm)}px)`]: {
    //   gridTemplateColumns: "repeat(2, 1fr)",
    //   columnGap: "16px",
    // },

    // [theme.fn.largerThan(getBreakpointValue(theme.breakpoints.xl))]: {
    //   gridTemplateColumns: "repeat(5, 1fr)",
    //   columnGap: "24px",
    // },
    // [theme.fn.largerThan("lg")]: {
    //   gridTemplateColumns: "repeat(4, 1fr)",
    //   columnGap: "24px",
    // },
    // [theme.fn.largerThan("md")]: {
    //   gridTemplateColumns: "repeat(3, 1fr)",
    // },
    // [theme.fn.largerThan("sm")]: {
    //   gridTemplateColumns: "repeat(2, 1fr)",
    //   columnGap: "16px",
    // },
  },
}));
