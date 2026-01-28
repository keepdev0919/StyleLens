export function cmToFtIn(cm: number): { ft: number; in: number } {
    const totalInches = cm / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    if (inches === 12) return { ft: ft + 1, in: 0 };
    return { ft, in: inches };
}

export function ftInToCm(ft: number, inches: number): number {
    return Math.round((ft * 12 + inches) * 2.54);
}

export function kgToLbs(kg: number): number {
    return Math.round(kg * 2.20462);
}

export function lbsToKg(lbs: number): number {
    return Math.round(lbs / 2.20462);
}
