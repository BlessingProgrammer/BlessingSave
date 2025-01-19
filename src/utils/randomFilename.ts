export const randomFilename = (quantity: string, extension: string): string => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `BlessingSave-${quantity}-${randomNumber}.${extension}`;
};
