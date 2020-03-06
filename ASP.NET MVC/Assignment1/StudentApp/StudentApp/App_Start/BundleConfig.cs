using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace StudentApp
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bootstrap/lib").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/site.js",
                      "~/Scripts/jquery.validate*",
                      "~/Scripts/bootbox.js",
                      "~/Scripts/datatables/jquery.datatables.js",
                      "~/Scripts/datatables/datatables.bootstrap.js",
                      "~/Scripts/moment.js"));
            
            bundles.Add(new StyleBundle("~/bootstrap/css").Include(
                      "~/Content/bootstrap-darkly-3.4.1.css",
                      "~/Content/datatables/css/datatables.bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}