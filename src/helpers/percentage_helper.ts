export const getPercentage = (maxValue: number, value: number) => {
    const percentage = ( value / maxValue ) * 100;
    return percentage <= 100 ? percentage : 100;
}