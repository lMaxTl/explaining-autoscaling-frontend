import { Text } from "@mantine/core"
import PromQlCodeBlock from "../../../Syntaxhighlighter/PromQlCodeBlock";

export default function QueryInformation({ queryInfo }: { queryInfo: string }) {
    return (
        <Text>
            <PromQlCodeBlock code={queryInfo} />
        </Text>
    );
}