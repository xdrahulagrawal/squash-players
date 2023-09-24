export const isValidMobile = (mobile: string): boolean => {
    const mobileRegex = /^[0-9]{10}$/; // Assuming a 10-digit mobile number
    return mobileRegex.test(mobile);
};

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
    const stabilizedThis = array.map((el, index) => ({ el, index }));
    stabilizedThis.sort((a, b) => {
        const order = comparator(a.el, b.el);
        if (order !== 0) return order;
        return a.index - b.index;
    });
    return stabilizedThis.map((el) => el.el);
}


export function getComparator<Key extends keyof any>(order: 'asc' | 'desc', orderBy: Key): (a: any, b: any) => number {
    return (a, b) => {
        const aValue = typeof a[orderBy] === 'string' ? a[orderBy].toLowerCase() : a[orderBy];
        const bValue = typeof b[orderBy] === 'string' ? b[orderBy].toLowerCase() : b[orderBy];
        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
    };
}