using System;
using System.Globalization;
using System.Collections.Generic;
using TaxCalculator.Business;

namespace TaxCalculator.UI
{
    public class InvestmentGreaterException : Exception
    {
        public InvestmentGreaterException(String message)
            : base(message)
        {

        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                double income = 0, investment = 0;
                Console.WriteLine("Kindly enter your income and Investments Amount under 80C (if any).");
                int errorFlag = 0;
                do
                {
                    errorFlag = 0;
                    string[] inputs = Console.ReadLine().Split();
                    if (inputs.Length > 1)
                    {
                        try
                        {
                            income = double.Parse(inputs[0]);
                            investment = double.Parse(inputs[1]);
                            if (income < investment)
                            {
                                throw new InvestmentGreaterException("The income amount is lesser than investment amount. Kindly enter again.");
                            }
                        }
                        catch (FormatException)
                        {
                            Console.WriteLine("One or more inputs aren't valid. Kindly enter again.");
                            errorFlag = 1;
                        }
                        catch (InvestmentGreaterException ex)
                        {
                            Console.WriteLine(ex.Message);
                            errorFlag = 1;
                        }
                    }
                    else
                    {
                        try
                        {
                            income = double.Parse(inputs[0]);
                        }
                        catch (Exception)
                        {
                            errorFlag = 1;
                            Console.WriteLine("Kindly enter a valid numeric data as income.");
                        }
                    }
                } while (errorFlag != 0);

                CultureInfo hindi = new CultureInfo("hi-IN");
                Console.WriteLine("\nIncome: Rs.{0}", string.Format(hindi, "{0:c}", income).Substring(1));
                if (investment != 0)
                {
                    Console.WriteLine("\nInvestment: Rs.{0}", string.Format(hindi, "{0:c}", investment).Substring(1));
                    Console.WriteLine("(Maximum Rs.1,50,000 can be exempted from tax.)");
                }

                Calculate c = new Calculate();
                double taxableIncome = c.TaxableIncomeAfterInvestment(income, investment);

                Console.WriteLine("\nTaxable Income: Rs.{0}", string.Format(hindi, "{0:c}", taxableIncome).Substring(1));
                Console.WriteLine("\nTax Under Different Slab Rates:");
                Console.WriteLine("-------------------------------");
                List<double> taxUnderSlabs = c.ReturnTaxUnderDiffSlabs(taxableIncome);
                if (taxUnderSlabs.Count == 0)
                {
                    Console.WriteLine("Rs.0 - Rs.500000:-\nRs.0");
                    Console.WriteLine("------------------");
                    Console.WriteLine("Total:\tRs.0");
                }
                else
                {
                    int rangeValue = 0;
                    for (int i = 0; i < taxUnderSlabs.Count; i++)
                    {
                        if (rangeValue == 1000000)
                        {
                            Console.WriteLine("{0} - {1}:-\nRs.{2}", rangeValue, "Any", string.Format(hindi, "{0:c}", taxUnderSlabs[i]).Substring(1));
                            Console.WriteLine("---------------------");
                        }
                        else
                        {
                            Console.WriteLine("{0} - {1}:-\nRs.{2}", rangeValue, rangeValue + 500000, string.Format(hindi, "{0:c}", taxUnderSlabs[i]).Substring(1));
                            Console.WriteLine("---------------------");
                            rangeValue += 500000;
                        }
                    }
                    Console.WriteLine("Total:\tRs.{0}", string.Format(hindi, "{0:c}", c.SumOfIndividualTaxSlab(taxUnderSlabs)).Substring(1));
                }
                Console.WriteLine("Do you wish to calculate again?(y/n)");
                if (Console.ReadLine().ToLower() != "y")
                {
                    break;
                }
            }
        }
    }
}
