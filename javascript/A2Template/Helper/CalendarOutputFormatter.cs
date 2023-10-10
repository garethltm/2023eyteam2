using Models;
using System;
using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Net.Http.Headers;
using Dtos;

namespace Helper
{
    public class CalendarOutputFormatter : TextOutputFormatter
    {
        public CalendarOutputFormatter()
        {
            SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("text/calendar"));
            SupportedEncodings.Add(Encoding.UTF8);
        }

        public override Task WriteResponseBodyAsync(OutputFormatterWriteContext context, Encoding selectedEncoding)
        {
            Event events = (Event)context.Object;
            StringBuilder builder = new StringBuilder();
            builder.AppendLine("BEGIN:VCALENDAR");
            builder.AppendLine("VERSION:4.0");
            builder.AppendLine($"PRODID:-cxio665");
            builder.AppendLine("BEGIN:VEVENT");
            builder.Append("UID:").AppendLine(events.Id + "");
            builder.AppendLine($"DISTAMP:{DateTime.UtcNow.ToString("yyyyMMddTHHmmssZ")}");
            builder.AppendLine($"DTSTART:{events.Start}");
            builder.AppendLine($"DTEND:{events.End}");
            builder.AppendLine($"SUMMARY:{events.Summary}");
            builder.AppendLine($"DESCRIPTION:{events.Description}");
            builder.AppendLine($"LOCATION:{events.Location}");
            builder.AppendLine("END:VEVENT");
            builder.AppendLine("END:VCALENDAR");
            string outString = builder.ToString();
            byte[] outBytes = selectedEncoding.GetBytes(outString);
            var response = context.HttpContext.Response.Body;
            return response.WriteAsync(outBytes, 0, outBytes.Length);
        }
    }
}