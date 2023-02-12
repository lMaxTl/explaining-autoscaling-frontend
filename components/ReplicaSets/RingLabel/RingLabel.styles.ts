import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  centerTextInRing: {
    flexDirection: "column",
  },
  podAmountCount: {
    fontSize: 25,
    fontWeight: 700,
    backgroundColor: theme.colors.blue[5],
    color: theme.colorScheme === "dark" ? "inherit" : "white",
    borderRadius: "50%",
    width: 50,
    height: 50,
    textAlign: "center",
    paddingTop: 5,
  },
}));
