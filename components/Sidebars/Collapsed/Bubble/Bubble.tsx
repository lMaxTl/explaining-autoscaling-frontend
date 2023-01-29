import { BubbleProps } from "./Bubble.dto";
import { useStyles } from "./Bubble.styles";
import ReactTooltip from 'react-tooltip';


export function Bubble({ description, active }: BubbleProps) {
    const { classes, cx } = useStyles({ active });
    return (
        <div data-testid="bubble" className={cx(classes.bubble)} data-tip={description} >
            <ReactTooltip />
        </div>
    );
}