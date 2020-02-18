using System;
using System.Collections.Generic;

namespace TaxCalculator.Infra
{
    /// <summary>
    /// Interface containing all methods used in business logic.
    /// </summary>
    public interface ICalculate
    {
        /// <summary>
        /// Function to find the taxable income after considering investments. 
        /// </summary>
        /// <param name="num1" type="double"></param>
        /// <param name="num2" type="double"></param>
        /// <returns type="double"></returns>
        double TaxableIncomeAfterInvestment(double num1, double num2);
        
        /// <summary>
        /// To store te income tax under different slabs based on their rate respectively. 
        /// </summary>
        /// <param name="num1" type="double"></param>
        /// <returns type="List<double>"></returns>
        List<Double> ReturnTaxUnderDiffSlabs(double num1);
        
        /// <summary>
        /// To find the total sum of individual taxes under each slab. 
        /// </summary>
        /// <param name="list" type="List<double>"></param>
        /// <returns type="double"></returns>
        double SumOfIndividualTaxSlab(List<double> list);
    }
}
