export const passwordReplacer = (key: string, value: any) => {
    if (key === 'password') return undefined;
    else return value;
};
