using System;
using System.Globalization;
using System.Collections.Generic;
using TaxCalculator.Business;

namespace TaxCalculator.UI
{
    /// <summary>
    /// Class inheriting the Exception class for implementing User Defined Exception.
    /// In this case exception should be thrown for when investment value greater than income value.
    /// </summary>
    public class InvestmentGreaterException : Exception
    {
        /// <summary>
        /// Function to customize the investment greater than income value exception message.
        /// </summary>
        public override string Message
        {
            get 
            { 
                return "Investment amount greater than income amount. Kindly enter again.";
            }
        }
    }

    /// <summary>
    /// Class inheriting the Exception class for implementing User Defined Exception.
    /// In this case exceptions for negative value.
    /// </summary>
    public class NegativeNumberException : Exception
    {
        /// <summary>
        /// Function to customize the negative number input exception message.
        /// </summary>
        public override string Message
        {
            get 
            {
                return "Negative Input. Kindly enter again.";
            }
        }
    }

    class Program
    {
        static double income, investment;
        static void Main(string[] args)
        {   
            while (true)
            {
                Console.WriteLine("Kindly enter your income and Investments Amount under 80C (if any).");
                var errorFlag = 0;
                do
                {
                    income = 0;
                    investment = 0;
                    errorFlag = 0;
                    string[] inputs = Console.ReadLine().Split();
                    try
                    { 
                        if(Double.TryParse(inputs[0],out income))
                        {
                            if (inputs.Length > 1)
                            {
                                if (Double.TryParse(inputs[1], out investment))
                                {
                                    if (income < investment)
                                    {
                                        throw new InvestmentGreaterException();
                                    }
                                }
                                else
                                {
                                    throw new FormatException();
                                }
                            }
                            if (income < 0 || investment < 0)
                            {
                                throw new NegativeNumberException();
                            }
                        }
                        else
                        {
                            throw new FormatException();
                        }
                    }
                    // Catch negative input exception.
                    catch (NegativeNumberException ex)
                    {
                        Console.WriteLine(ex.Message);
                        errorFlag = 1;
                    }
                    // Catch investment(if exists) is greater than income exception.
                    catch (InvestmentGreaterException ex)
                    {
                        Console.WriteLine(ex.Message);
                        errorFlag = 1;
                    }
                    // Catch invalid numeric input format exception.
                    catch (FormatException)
                    {
                        Console.WriteLine("One or more inputs aren't valid. Kindly enter again.");
                        errorFlag = 1;
                    }
                    // Catch other exception (if exists).
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        errorFlag = 1;
                    }
                } while (errorFlag != 0);

                // To display the income and investment(if any) amount in Indian format.
                
                Console.WriteLine("\nIncome: Rs.{0}", IndianFormat(income));
                if (investment != 0)
                {
                    Console.WriteLine("\nInvestment: Rs.{0}", IndianFormat(investment));
                    Console.WriteLine("(Maximum Rs.1,50,000 can be exempted from tax.)");
                }
                
                Calculate c = new Calculate();
                
                // Display taxable income amount after taking investment into account.
                double taxableIncome = c.TaxableIncomeAfterInvestment(income, investment);
                Console.WriteLine("\nTaxable Income: Rs.{0}", IndianFormat(taxableIncome));
                
                // Tax amount under each slab rate.
                Console.WriteLine("\nTax Under Different Slab Rates:");
                Console.WriteLine("-------------------------------");
                List<double> taxUnderSlabs = c.ReturnTaxUnderDiffSlabs(taxableIncome);
               
                // Display when there is no tax charged on the income amount.
                // If the tax for the Rs.0 to Rs.5L is zero then itis obviously zero for the rest slabs.
                if (taxUnderSlabs.Count == 0)
                {
                    Console.WriteLine("Rs.0 - Rs.500000:-\nRs.0");
                    Console.WriteLine("------------------");
                    Console.WriteLine("Total:\tRs.0");
                }
                    
                // Display tax charged on the income amount based on each slab until the income falls into that slab range.
                else
                {
                    var rangeValue = 0;
                    for (var i = 0; i < taxUnderSlabs.Count; i++)
                    {
                        if (rangeValue == 1000000)
                        {
                            Console.WriteLine("{0} - {1}:-\nRs.{2}", rangeValue, "Any", IndianFormat(taxUnderSlabs[i]));
                            Console.WriteLine("---------------------");
                            break;
                        }
                        Console.WriteLine("{0} - {1}:-\nRs.{2}", rangeValue, rangeValue += 500000, IndianFormat(taxUnderSlabs[i]));
                        Console.WriteLine("---------------------");
                    }
                    Console.WriteLine("Total:\tRs.{0}", IndianFormat(c.SumOfIndividualTaxSlab(taxUnderSlabs)));
                }

                // To repeat the process.
                Console.WriteLine("Do you wish to calculate again?(y/n)");
                if (Console.ReadLine().ToLower() != "y")
                {
                    break;
                }
            }
        }
        /// <summary>
        /// Function to display the money in indian format.
        /// </summary>
        /// <param name="input"></param>
        /// <returns type="string"></returns>
        static string IndianFormat(double input)
        {
            CultureInfo hindi = new CultureInfo("hi-IN");
            return string.Format(hindi, "{0:c}", input).Substring(1);
        }
    }
}
