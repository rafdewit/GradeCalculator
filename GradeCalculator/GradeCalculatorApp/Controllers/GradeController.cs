using GradeCalculator.DataLayer.DataProviders;
using Microsoft.AspNetCore.Mvc;

namespace GradeCalculatorApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GradeController : ControllerBase
    {
        private readonly IGradeDataProvider _gradeDataProvider;

        public GradeController(IGradeDataProvider gradeDataProvider)
        {
            _gradeDataProvider = gradeDataProvider;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Get(string? id = null)
        {
            if(string.IsNullOrEmpty(id))
            {
                var gradeData = _gradeDataProvider.GetAll();
                return Ok(gradeData);
            }
            else
            {
                var gradeData = _gradeDataProvider.Get(id);
                if(gradeData == null)
                {
                    return NotFound($"class with id: {id} was not found");
                }

                return Ok(gradeData);
            }
        }
    }
}
