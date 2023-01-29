export function insertBreakColors(list: any[]) {
    for (let i = 0; i < list.length; i++) {
        if (i % 2 != 0) {
            list.splice(i, 0, {
                value: 0.3,
                color: 'black'
            });
        }
    }
    list.splice(list.length, 0, {
        value: 0.3,
        color: 'black'
    });

}