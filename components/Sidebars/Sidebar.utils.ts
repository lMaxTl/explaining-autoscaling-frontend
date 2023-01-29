
interface onBubbleActivationProps {
    count: number,
    onClickHandlers: { set: (arg0: number) => void; },
    scrollToId: string,
}

export function onBubbleActivation({ count, onClickHandlers, scrollToId }: onBubbleActivationProps) {
    onClickHandlers.set(count);

    const element = document.getElementById(scrollToId);
    const elementPosition = element?.offsetTop;
    const scrollPosition = elementPosition ? elementPosition - 60 : 0;
    window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
    });

}
