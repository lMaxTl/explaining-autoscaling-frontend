import { useMantineTheme } from "@mantine/core";

export function insertBreakColors(list: any[]) {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";
  for (let i = 0; i < list.length; i++) {
    if (i % 2 != 0) {
      list.splice(i, 0, {
        value: 0.3,
        color: dark ? "black" : "white",
      });
    }
  }
  list.splice(list.length, 0, {
    value: 0.3,
    color: dark ? "black" : "white",
  });
}
