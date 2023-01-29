import { render } from "@testing-library/react";
import QueryInformation from "./QueryInformation";

test("renders query information", () => {
    const queryInfo = "query_info";
    const { getByText } = render(<QueryInformation queryInfo={queryInfo} />);
    expect(getByText(queryInfo)).toBeInTheDocument();
});
