import { useCounter } from "@mantine/hooks";
import React, { useEffect } from "react";
import { useStyles } from "./SidebarCollapsed.styles"
import { Bubble } from "./Bubble/Bubble";
import { onBubbleActivation } from '../Sidebar.utils';

export default function SidebarCollapsed() {
    const { classes, cx } = useStyles();
    const [count, handlers] = useCounter(0, { min: 0, max: 3 });

    const handleScroll = () => {
        if (window.scrollY < 400) {
            handlers.set(0);
        } else if (window.scrollY < 800) {
            handlers.set(1);
        } else if (window.scrollY < 1750) {
            handlers.set(2);
        } else {
            handlers.set(3);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    
    return (
        <div data-testid="sidebar-collapsed" className={cx(classes.sidebarPosition)}>
            <div className={cx(classes.verticalLine)} />
            
            <div onClick={() => onBubbleActivation({ count: 0, onClickHandlers: handlers, scrollToId: "replicaSet" })}>
                <Bubble description="How much did it scale?" active={count == 0} />
            </div>

            <div className={cx(classes.verticalLine)} />

            <div onClick={() => onBubbleActivation({ count: 1, onClickHandlers: handlers, scrollToId: "metricTimeline" })}>
                <Bubble description="Why (not) and when did it scale?" active={count == 1} />
            </div>

            <div className={cx(classes.verticalLine)} />

            <div onClick={() => onBubbleActivation({ count: 2, onClickHandlers: handlers, scrollToId: "query" })}>
                <Bubble description="Why this amount?" active={count == 2} />
            </div>
            <div className={cx(classes.verticalLine)} />

            <div onClick={() => onBubbleActivation({ count: 3, onClickHandlers: handlers, scrollToId: "dependencyChart" })}>
                <Bubble description="How does it affect other Services?" active={count == 3} />
            </div>

            <div className={cx(classes.verticalLine)} />
        </div>
    );
}