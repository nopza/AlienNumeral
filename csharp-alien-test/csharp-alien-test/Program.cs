public class Program
{
    public static void Main(string[] args)
    {
        string input = "RCRZCAB";
        Console.WriteLine("Input: " + input);
        Console.WriteLine("Output: " + CalculateAlienNumbers(input));
    }

    public static int CalculateAlienNumbers(string input)
    {
        Dictionary<char, int> alienNumberList = new Dictionary<char, int>
        {
            { 'A', 1 },
            { 'B', 5 },
            { 'Z', 10 },
            { 'L', 50 },
            { 'C', 100 },
            { 'D', 500 },
            { 'R', 1000 }
        };

        int result = 0;

        for (int i = 0; i < input.Length; i++)
        {
            int currentValue = alienNumberList[input[i]];
            int nextValue = (i + 1 < input.Length) ? alienNumberList[input[i + 1]] : 0;

            if (currentValue < nextValue)
                result -= currentValue;
            else
                result += currentValue;
        }

        return result;
    }
}
