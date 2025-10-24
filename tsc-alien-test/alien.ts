type AlienChar = 'A' | 'B' | 'Z' | 'L' | 'C' | 'D' | 'R';

function alienToInt(s: string): number {
    const alienValues: Record<AlienChar, number> = {
        A: 1,
        B: 5,
        Z: 10,
        L: 50,
        C: 100,
        D: 500,
        R: 1000,
    };

    const canSubtract: Record<AlienChar, AlienChar[]> = {
        A: ['B', 'Z'],   // 4, 9
        Z: ['L', 'C'],   // 40, 90
        C: ['D', 'R'],   // 400, 900
        B: [], L: [], D: [], R: []
    };

    let total = 0;
    let repeatCount = 1;

    for (let i = 0; i < s.length; i++) {
        const char = s[i] as AlienChar;
        const value = alienValues[char];

        if (value === undefined) {
            throw new Error(`Invalid symbol: ${char}`);
        }

        let nextChar: AlienChar | null = null;
        let nextValue = 0;
        if (i + 1 < s.length) {
            nextChar = s[i + 1] as AlienChar;
            nextValue = alienValues[nextChar];
        }

        if (i > 0 && char === s[i - 1]) {
            repeatCount++;
            switch (char) {
                case 'A':
                case 'Z':
                case 'C':
                    if (repeatCount > 3) {
                        throw new Error(`Invalid: too many repetitions of ${char}`);
                    }
                    break;
                case 'B':
                case 'L':
                case 'D':
                case 'R':
                    throw new Error(`Invalid: symbol ${char} cannot repeat`);
            }
        } else {
            repeatCount = 1;
        }

        if (value < nextValue) {
            if (nextChar && canSubtract[char].indexOf(nextChar) !== -1) {
                total -= value;
                continue;
            } else {
                throw new Error(`Invalid: ${char} cannot precede ${nextChar}`);
            }
        }

        total += value;
    }

    return total;
}

const samples = ["AAA", "LBAAA", "RCRZCAB", "AAAA", "AC", "AZ", "ZL", "ZR"];
for (const s of samples) {
    try {
        console.log(`Input: ${s} => Output: ${alienToInt(s)}`);
    } catch (err: any) {
        console.log(`Input: ${s} => Error: ${err.message}`);
    }
}
