using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace StudentApp.Models
{
    public class AdultAgeValidation: ValidationAttribute
    {
       protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
           var student = (Students)validationContext.ObjectInstance;

           if (student.BirthDate == null)
           {
               return new ValidationResult("Date of Birth is required");   
           }
           if (student.BirthDate.Year < 1800)
           {
               return new ValidationResult("Please enter a valid Date of Birth");
           }
           var age = DateTime.Now.Year - student.BirthDate.Year;
           return age >= 18 ? ValidationResult.Success : new ValidationResult("The person should be born before "+DateTime.Now.AddYears(-18).Year.ToString());
        }
    }
}
