import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/components/prism-promql";
import "prismjs/themes/prism.css";

import { useStyles } from "./PromQlCodeBlock.styles";

export default function PromQlCodeBlock({ code }: { code: string }) {
    const { classes, cx } = useStyles();

    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <pre className={cx(classes.removeBackground)}>
            <code data-testid="code-block" children={code} className={cx(classes.styleText) + ' language-promql'} />
        </pre>
    );
}
