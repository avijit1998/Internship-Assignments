using System;
using System.Collections.Generic;
using TaxCalculator.Infra;
namespace TaxCalculator.Business
{
    /// <summary>
    /// Class implementing the ICalculate interface.
    /// </summary>
    public class Calculate:ICalculate
    {
        /// <summary>
        /// Function to find the taxable income after considering investments. 
        /// </summary>
        /// <param name="income" type="double"></param>
        /// <param name="investment" type="double"></param>
        /// <returns type="double">Taxable Income</returns>
        public double TaxableIncomeAfterInvestment(double income, double investment)
        {
            return (income < 250000)? income : (investment > 150000)? income - 150000: income - investment;  
        }

        /// <summary>
        /// To store te income tax under different slabs based on their rate respectively. 
        /// </summary>
        /// <param name="taxableIncome" type="double"></param>
        /// <returns type="List<double>">List containing taxes calculated for each slab based on income.</returns>
        public List<double> ReturnTaxUnderDiffSlabs(double taxableIncome)
        {
            List<double> taxUnderSlabs = new List<Double>();
            
            // For slab rate range 0L-5L.
            if (taxableIncome > 250000 && taxableIncome <= 500000)
            {
                taxUnderSlabs.Add(0.05 * (taxableIncome - 250000));
                return taxUnderSlabs;
            }

            // For slab rate range 5L-10L.
            if(taxableIncome > 500000 && taxableIncome <= 1000000){
                taxUnderSlabs.Add(12500);
                taxUnderSlabs.Add(0.2 * (taxableIncome - 500000));
                return taxUnderSlabs;
            }

            // For slab rate range above 10L.
            if (taxableIncome > 1000000)
            {
                taxUnderSlabs.Add(12500);
                taxUnderSlabs.Add(100000);
                taxUnderSlabs.Add(0.3 * (taxableIncome - 1000000));
                return taxUnderSlabs;
            }
            return taxUnderSlabs;
        }

        /// <summary>
        /// To find the total sum of individual taxes under each slab.  
        /// </summary>
        /// <param name="taxUnderSlabs" type="List<double>"></param>
        /// <returns type="double">Total Income Tax</returns>
        public double SumOfIndividualTaxSlab(List<double> taxUnderSlabs)
        {
            double sum = 0;
            
            foreach (var tax in taxUnderSlabs)
            {
                sum += tax;
            }

            return sum;
        }
    }
}
