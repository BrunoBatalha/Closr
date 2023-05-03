using System;
using System.Threading.Tasks;
using Lokin_BackEnd.App.UseCases;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Lokin_BackEnd.Adapters.Controllers
{
    public class ControllerCustomBase : ControllerBase
    {
        protected async Task<IActionResult> Result(Func<Task<IActionResult>> funcResult)
        {
            try
            {
                return await funcResult();
            }
            catch (System.Exception exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, exception.Message);
            }
        }

        protected IActionResult GetResultOk<TBoundary>(OutputBoundaryBase<TBoundary> boundary)
        {
            return GetResult(boundary, () => Ok(boundary.Value));
        }

        protected IActionResult GetResultCreated<TBoundary>(OutputBoundaryBase<TBoundary> boundary, string uri)
        {
            return GetResult(boundary, () => Created(uri, boundary.Value));
        }

        private IActionResult GetResult<TBoundary>(OutputBoundaryBase<TBoundary> boundary, Func<IActionResult> funcSuccess)
        {
            if (boundary.Errors != null && boundary.Errors.Length > 0)
            {
                return BadRequest(boundary.Errors);
            }

            if (boundary.StatusCode != null)
            {
                return StatusCode(((int)boundary.StatusCode));
            }

            return funcSuccess();
        }
    }
}