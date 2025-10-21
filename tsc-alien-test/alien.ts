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

    let total = 0;

    for (let i = 0; i < s.length; i++) {

        const char = s[i] as AlienChar;

        const value = alienValues[char];

        let nextValue = 0;
        if (i + 1 < s.length) {
            const nextChar = s[i + 1] as AlienChar;
            nextValue = alienValues[nextChar];
        }

        if (value < nextValue) {
            total -= value;
        } else {
            total += value;
        }
    }

    return total;
}

const s = "RCRZCAB";
console.log("Input: s =", s);
console.log("Output =", alienToInt(s));