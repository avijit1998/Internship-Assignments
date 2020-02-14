using System;
using System.Collections.Generic;
using TaxCalculator.Infra;
namespace TaxCalculator.Business
{
    public class Calculate:ICalculate
    {
        public double TaxableIncomeAfterInvestment(double income, double investment)
        {
            if (income < 250000)
            {
                return income;
            }
            else
            {
                if (investment > 150000)
                {
                    return income - 150000;
                }
                else
                {
                    return income - investment;
                }
            }
        }

        public List<double> ReturnTaxUnderDiffSlabs(double taxableIncome)
        {
            List<double> taxUnderSlabs = new List<Double>();
            if (taxableIncome > 250000 && taxableIncome <= 500000)
            {
                taxUnderSlabs.Add(0.05 * (taxableIncome - 250000));
                return taxUnderSlabs;
            }
            if(taxableIncome > 500000 && taxableIncome <= 1000000){
                taxUnderSlabs.Add(12500);
                taxUnderSlabs.Add(0.2 * (taxableIncome - 500000));
                return taxUnderSlabs;
            }
            if (taxableIncome > 1000000)
            {
                taxUnderSlabs.Add(12500);
                taxUnderSlabs.Add(100000);
                taxUnderSlabs.Add(0.3 * (taxableIncome - 1000000));
                return taxUnderSlabs;
            }
            return taxUnderSlabs;
        }

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
