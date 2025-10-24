public class Program
{
    public static void Main(string[] args)
    {
        string[] inputs = { "AAA", "LBAAA", "RCRZCAB", "AAAA", "AC" };
        foreach (string input in inputs)
        {
            Console.WriteLine($"{input} → {CalculateAlienNumbers(input)}");
        }
    }

    public static string CalculateAlienNumbers(string input)
    {
        Dictionary<char, int> alien = new Dictionary<char, int>
        {
            { 'A', 1 },
            { 'B', 5 },
            { 'Z', 10 },
            { 'L', 50 },
            { 'C', 100 },
            { 'D', 500 },
            { 'R', 1000 }
        };

        Dictionary<char, char[]> allowedSubtract = new Dictionary<char, char[]>
        {
            { 'A', new[] { 'B', 'Z' } },
            { 'Z', new[] { 'L', 'C' } },
            { 'C', new[] { 'D', 'R' } }
        };

        int total = 0;
        int repeatCount = 1;

        for (int i = 0; i < input.Length; i++)
        {
            if (!alien.ContainsKey(input[i]))
                return "Invalid: Unknown symbol " + input[i];

            int current = alien[input[i]];
            int next = (i + 1 < input.Length) ? alien[input[i + 1]] : 0;

            if (i > 0 && input[i] == input[i - 1])
            {
                repeatCount++;
                if (repeatCount > 3 && (input[i] == 'A' || input[i] == 'Z' || input[i] == 'C'))
                    return "Invalid: Too many repetitions of " + input[i];
                if (input[i] == 'B' || input[i] == 'L' || input[i] == 'D' || input[i] == 'R')
                    return "Invalid: Symbol " + input[i] + " cannot repeat";
            }
            else
            {
                repeatCount = 1;
            }

            if (current < next)
            {
                if (!allowedSubtract.ContainsKey(input[i]) ||
                    Array.IndexOf(allowedSubtract[input[i]], input[i + 1]) == -1)
                    return $"Invalid: {input[i]} cannot precede {input[i + 1]}";

                total -= current;
            }
            else
            {
                total += current;
            }
        }

        return total.ToString();
    }
}
