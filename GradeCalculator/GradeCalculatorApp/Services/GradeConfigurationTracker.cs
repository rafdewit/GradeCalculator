using GradeCalculator.DataLayer.Models.Configurations;

namespace GradeCalculatorApp.Services
{
    public interface IGradeConfigurationTracker
    {
        GradeConfigurationSearchResult<MultiGradeConfiguration>? FindMulti(string multiId, params GradePeriod[] gradePeriods);
        GradeConfigurationSearchResult<SingleGradeConfiguration>? FindSingle(string singleId, params GradePeriod[] gradePeriods);
    }

    public class GradeConfigurationTracker : IGradeConfigurationTracker
    {
        public GradeConfigurationSearchResult<SingleGradeConfiguration>? FindSingle(string singleId, params GradePeriod[] gradePeriods)
        {
            foreach (var gradePeriod in gradePeriods)
            {
                var rootSingle = gradePeriod.SingleGradeConfigurations.FirstOrDefault(s => s.Id == singleId);
                if (rootSingle != null)
                    return new GradeConfigurationSearchResult<SingleGradeConfiguration>(rootSingle, null, gradePeriod);

                var single = FindSingleGradeConfiguration(singleId, gradePeriod.MultiGradeConfigurations, gradePeriod);
                if (single != null)
                    return single;
            }

            return null;
        }

        private GradeConfigurationSearchResult<SingleGradeConfiguration>? FindSingleGradeConfiguration(string singleId, IEnumerable<MultiGradeConfiguration> multis, GradePeriod gradePeriod)
        {
            foreach (var subMulti in multis)
            {
                var rootSingle = subMulti.SingleGradeConfigurations.FirstOrDefault(s => s.Id == singleId);
                if (rootSingle != null)
                    return new GradeConfigurationSearchResult<SingleGradeConfiguration>(rootSingle, subMulti, gradePeriod);

                var found = FindSingleGradeConfiguration(singleId, subMulti.MultiGradeConfigurations, gradePeriod);
                if (found != null)
                    return found;
            }

            return null;
        }

        public GradeConfigurationSearchResult<MultiGradeConfiguration>? FindMulti(string multiId, params GradePeriod[] gradePeriods)
        {
            foreach (var gradePeriod in gradePeriods)
            {
                var multi = FindMultiGradeConfiguration(multiId, gradePeriod.MultiGradeConfigurations, null, gradePeriod);
                if (multi != null)
                    return multi;
            }

            return null;
        }

        private GradeConfigurationSearchResult<MultiGradeConfiguration>? FindMultiGradeConfiguration(string multiId, IEnumerable<MultiGradeConfiguration> multis, MultiGradeConfiguration? parent, GradePeriod gradePeriod)
        {
            var multi = multis.FirstOrDefault(m => m.Id == multiId);
            if (multi != null)
                return new GradeConfigurationSearchResult<MultiGradeConfiguration>(multi, parent, gradePeriod);

            foreach (var subMulti in multis)
            {
                var found = FindMultiGradeConfiguration(multiId, subMulti.MultiGradeConfigurations, subMulti, gradePeriod);
                if (found != null)
                    return found;
            }

            return null;
        }
    }

    public class GradeConfigurationSearchResult<T>(T result, MultiGradeConfiguration? parent, GradePeriod gradePeriod)
    {
        public T Result { get; set; } = result;
        public MultiGradeConfiguration? Parent { get; set; } = parent;
        public GradePeriod GradePeriod { get; set; } = gradePeriod;
    }
}
