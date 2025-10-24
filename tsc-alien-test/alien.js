function alienToInt(s) {
    var alienValues = {
        A: 1,
        B: 5,
        Z: 10,
        L: 50,
        C: 100,
        D: 500,
        R: 1000,
    };
    var canSubtract = {
        A: ['B', 'Z'], // 4, 9
        Z: ['L', 'C'], // 40, 90
        C: ['D', 'R'], // 400, 900
        B: [], L: [], D: [], R: []
    };
    var total = 0;
    var repeatCount = 1;
    for (var i = 0; i < s.length; i++) {
        var char = s[i];
        var value = alienValues[char];
        if (value === undefined) {
            throw new Error("Invalid symbol: ".concat(char));
        }
        var nextChar = null;
        var nextValue = 0;
        if (i + 1 < s.length) {
            nextChar = s[i + 1];
            nextValue = alienValues[nextChar];
        }
        if (i > 0 && char === s[i - 1]) {
            repeatCount++;
            switch (char) {
                case 'A':
                case 'Z':
                case 'C':
                    if (repeatCount > 3) {
                        throw new Error("Invalid: too many repetitions of ".concat(char));
                    }
                    break;
                case 'B':
                case 'L':
                case 'D':
                case 'R':
                    throw new Error("Invalid: symbol ".concat(char, " cannot repeat"));
            }
        }
        else {
            repeatCount = 1;
        }
        if (value < nextValue) {
            if (nextChar && canSubtract[char].indexOf(nextChar) !== -1) {
                total -= value;
                continue;
            }
            else {
                throw new Error("Invalid: ".concat(char, " cannot precede ").concat(nextChar));
            }
        }
        total += value;
    }
    return total;
}
var samples = ["AAA", "LBAAA", "RCRZCAB", "AAAA", "AC", "AZ", "ZL", "ZR"];
for (var _i = 0, samples_1 = samples; _i < samples_1.length; _i++) {
    var s = samples_1[_i];
    try {
        console.log("Input: ".concat(s, " => Output: ").concat(alienToInt(s)));
    }
    catch (err) {
        console.log("Input: ".concat(s, " => Error: ").concat(err.message));
    }
}
