using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Text;

namespace StudentApp.Models
{
	public class GmailClientValidation : ValidationAttribute
	{
		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			var student = (Students)validationContext.ObjectInstance;
			if (student.Email != null)
			{
				try
				{
					MailAddress studentEmail = new MailAddress(student.Email);
					if(studentEmail.Host.ToString().Equals("gmail.com"))
					{
						return ValidationResult.Success;
					}
					else
					{
						return new ValidationResult("Email is Invalid(You can use only Gmail Address.)");
					}
				}
				catch(Exception)
				{
					return new ValidationResult("Email is Invalid");
				}
			}
			else
			{
				return ValidationResult.Success;
			}
		}
	}
}
