package main

import "fmt"

func alienToInt(s string) int {
	var alienValues = make(map[byte]int)
	alienValues['A'] = 1
	alienValues['B'] = 5
	alienValues['Z'] = 10
	alienValues['L'] = 50
	alienValues['C'] = 100
	alienValues['D'] = 500
	alienValues['R'] = 1000

	total := 0
	n := len(s)

	for i := 0; i < n; i++ {
		value := alienValues[s[i]]
		nextValue := 0
		if i+1 < n {
			nextValue = alienValues[s[i+1]]
		}

		if value < nextValue {
			total -= value
		} else {
			total += value
		}
	}

	return total
}

func main() {
	s := "RCRZCAB"
	fmt.Println("Input: s =", s)

	result := alienToInt(s)
	fmt.Println("Output =", result)
}
