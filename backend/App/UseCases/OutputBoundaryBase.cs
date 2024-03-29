using System.Net;
using Lokin_BackEnd.Domain.Errors;

namespace Lokin_BackEnd.App.UseCases
{
    public class OutputBoundaryBase<TOutput>
    {
        public HttpStatusCode? StatusCode { get; set; }
        public ErrorMessage[] Errors { get; set; }
        public TOutput Value { get; set; }
    }
}