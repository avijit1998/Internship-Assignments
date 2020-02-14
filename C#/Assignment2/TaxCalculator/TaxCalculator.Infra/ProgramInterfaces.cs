using System;
using System.Collections.Generic;

namespace TaxCalculator.Infra
{
    public interface ICalculate
    {
        double TaxableIncomeAfterInvestment(double num1, double num2);
        List<Double> ReturnTaxUnderDiffSlabs(double num1);
        double SumOfIndividualTaxSlab(List<double> list);
    }
}
