package main

import (
	"fmt"
)

func alienToInt(s string) (int, error) {
	alienValues := map[byte]int{
		'A': 1,
		'B': 5,
		'Z': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'R': 1000,
	}

	allowedSubtract := map[byte][]byte{
		'A': {'B', 'Z'},
		'Z': {'L', 'C'},
		'C': {'D', 'R'},
	}

	total := 0
	repeatCount := 1
	n := len(s)

	for i := 0; i < n; i++ {
		current := s[i]
		value, ok := alienValues[current]
		if !ok {
			return 0, fmt.Errorf("invalid symbol: %c", current)
		}

		var next byte
		nextValue := 0
		if i+1 < n {
			next = s[i+1]
			nextValue = alienValues[next]
		}

		if i > 0 && s[i] == s[i-1] {
			repeatCount++
			switch current {
			case 'A', 'Z', 'C':
				if repeatCount > 3 {
					return 0, fmt.Errorf("invalid: too many repetitions of %c", current)
				}
			case 'B', 'L', 'D', 'R':
				return 0, fmt.Errorf("invalid: symbol %c cannot repeat", current)
			}
		} else {
			repeatCount = 1
		}

		if value < nextValue {
			valid := false
			if allowed, exists := allowedSubtract[current]; exists {
				for _, ch := range allowed {
					if ch == next {
						valid = true
						break
					}
				}
			}
			if !valid {
				return 0, fmt.Errorf("invalid: %c cannot precede %c", current, next)
			}
			total -= value
		} else {
			total += value
		}
	}

	return total, nil
}

func main() {
	tests := []string{
		"AAA",     // 3
		"LBAAA",   // 58
		"RCRZCAB", // 1994
		"AAAA",    // invalid
		"AC",      // invalid
		"AZ",      // 9
		"ZL",      // 40
		"ZR",      // invalid
	}

	for _, s := range tests {
		result, err := alienToInt(s)
		if err != nil {
			fmt.Printf("%s → Error: %v\n", s, err)
		} else {
			fmt.Printf("%s → %d\n", s, result)
		}
	}
}
