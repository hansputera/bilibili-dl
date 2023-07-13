import { Text, Box } from "@mantine/core";
import { LIVE_BADGE } from "config";
import Image from "next/image";

/**
 * Badge Card Component.
 * @param {{ value: string, isLive: boolean }} props
 * @return {JSX.Element}
 */
export default function MaskCard({
  value,
  isLive = false,
}: {
  isLive?: boolean;
  value?: string;
}): JSX.Element {
  return (
    <Box
      py={12}
      px={isLive ? 10 : 12}
      pos="absolute"
      bottom={0}
      right={0}
      left={0}
      h={40}
      sx={{
        zIndex: 5,
        backgroundImage:
          "linear-gradient(0deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.3) 57%,rgba(0,0,0,.5) 99%);",
        transform: "scaleY(-1)",
        pointerEvents: "none",
        borderRadius: "8px",
        textAlign: "right",
      }}
    >
      {isLive ? (
        <Image
          src={LIVE_BADGE}
          width={42}
          height={16}
          alt="Live Badge"
          style={{
            transform: "scaleY(-1)",
            overflow: "clip",
            verticalAlign: "baseline",
          }}
        />
      ) : (
        <Text
          display="block"
          component="span"
          color="white"
          weight="bold"
          size={12}
          sx={{
            overflow: "hidden",
            whiteSpace: "pre",
            wordBreak: "break-all",
            textOverflow: "ellipsis",
            transform: "scaleY(-1)",
            lineHeight: 1,
          }}
        >
          {value}
        </Text>
      )}
    </Box>
  );
}
