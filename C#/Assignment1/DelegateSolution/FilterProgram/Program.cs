using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilterProgram
{
    public class Program
    {
        public delegate bool FilterDelegate(int n);
        static void Main(string[] args)
        {
            int[] nums = new int[10];
            Console.WriteLine("Enter 10 numbers.");
            for (int i = 0; i < nums.Length; i++)
            {
                while (!int.TryParse(Console.ReadLine(), out nums[i]))
                {
                    Console.WriteLine("Not a number! Enter again.");
                }
            }
            
            while (true)
            {
                Console.WriteLine("\nEnter Choice:\n" +
                              "1:Return all even numbers.\n" +
                              "2:Return numbers greater than 10\n" +
                              "3:Return numbers divisible by 5");
                int choice = Int32.Parse(Console.ReadLine());
                switch (choice)
                {
                    case 1:
                        GetResult(nums, IsEvenFilter);
                        break;
                    case 2:
                        GetResult(nums, IsGreaterThanTenFilter);
                        break;
                    case 3:
                        GetResult(nums, IsDivisibleByFiveFilter);
                        break;
                    default:
                        Console.WriteLine("Invalid Option! Please enter again.");
                        break;
                }
                Console.WriteLine("Again?(Y/N)");
                char flag = Console.ReadLine()[0];
                if (flag == 'Y' || flag == 'y')
                    continue;
                else
                    break;
            }
        }
        static void GetResult(int[] nums, FilterDelegate filter)
        { 
            foreach (int n in nums)
            {
                if (filter(n))
                {
                    Console.WriteLine(n);
                }
            }
            Console.Write("\n");
        }
        static bool IsEvenFilter(int n)
        {
            return n % 2 == 0;
        }
        static bool IsGreaterThanTenFilter(int n)
        {
            return n > 10;
        }
        static bool IsDivisibleByFiveFilter(int n)
        {
            return n % 5 == 0;
        }
    }
}
