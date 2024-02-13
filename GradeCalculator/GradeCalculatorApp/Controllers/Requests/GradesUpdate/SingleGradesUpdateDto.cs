namespace GradeCalculatorApp.Controllers.Requests.GradesUpdate
{
    public class SingleGradesUpdateDto
    {
        public SingleGradesUpdateDto(string studentCollectionId, string singleGradeConfigurationId, IEnumerable<SingleGradeUpdateDto> singleGradeUpdates)
        {
            StudentCollectionId = studentCollectionId;
            SingleGradeConfigurationId = singleGradeConfigurationId;
            SingleGradeUpdates = singleGradeUpdates;
        }

        public string StudentCollectionId { get; set; }
        public string SingleGradeConfigurationId { get; set; }
        public IEnumerable<SingleGradeUpdateDto> SingleGradeUpdates { get; set; }
    }
}
