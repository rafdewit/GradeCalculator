import { GradientConfig } from "./gradient-config";

export function generateRandomColor(): string {
    return "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
}

export function validateHexColor(color: string): boolean {
    if(!color.startsWith("#") || color.length !== 7) {
        return false;
    }

    return true;
}

export function grabColor(config: GradientConfig, value: number, colorSteps: string[]) {
    if(config.gradientLow < config.gradientHigh) {
        if(value < config.gradientLow) {
            return colorSteps[0];
        } else if(value > config.gradientHigh) {
            return colorSteps[colorSteps.length - 1];
        } else {
            const range = config.gradientHigh - config.gradientLow;
            const steps = range / config.steps;
            const index = Math.floor((value - config.gradientLow) / steps);
            return colorSteps[index];
        }
    } else if(config.gradientLow > config.gradientHigh) {
        if(value < config.gradientHigh) {
            return colorSteps[colorSteps.length - 1];
        } else if(value > config.gradientLow) {
            return colorSteps[0];
        } else {
            const range = config.gradientLow - config.gradientHigh;
            const steps = range / config.steps;
            const index = colorSteps.length - Math.floor((value - config.gradientLow) / steps);
            return colorSteps[index];
        }
    } else {
        return colorSteps[0];
    }
}

export function valuesBetween(v1: number, v2: number, steps: number): number[] {
    const values: number[] = [];

    if(v1 > v2) {
        const difference = v1 - v2;
        const step = difference / steps;
        for(let i = 0; i < steps; i++) {
            values.push(Math.round(v1 - i*step));
        }
    } else if(v1 < v2) {
        const difference = v2 - v1;
        const step = difference / steps;
        for(let i = 0; i < steps; i++) {
            values.push(Math.round(v1 + i*step));
        }
    } else {
        for(let i = 0; i < steps; i++) {
            values.push(v1);
        }
    }

    return values;
}

export function colorsBetween(c1: string, c2: string, steps: number): string[] {
    const values0 = valuesBetween(hexToNumber(c1.substring(1, 2)), hexToNumber(c2.substring(1, 2)), steps);
    const values1 = valuesBetween(hexToNumber(c1.substring(3, 4)), hexToNumber(c2.substring(3, 4)), steps);
    const values2 = valuesBetween(hexToNumber(c1.substring(5, 6)), hexToNumber(c2.substring(5, 6)), steps);

    const result: string[] = [];
    result.push(c1);

    for(let i = 0; i < steps; i++) {
        result.push(`#${numberToHex(values0[i])}${numberToHex(values1[i])}${numberToHex(values2[i])}`);
    }

    result.push(c2);
    return result;
}

export function numberToHex(number: number) {
    return number.toString(16);
}

export function hexToNumber(hex: string): number {
    return parseInt(hex, 16);
}
