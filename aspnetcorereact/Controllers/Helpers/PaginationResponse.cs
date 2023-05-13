namespace aspnetcorereact.Controllers.Helpers
{
    public class PaginationResponse<T>
    {
        public List<T> Values { get; }
        public int TotalCount { get; }
        public int PageSize { get; }

        public PaginationResponse(List<T> values, int totalCount, int pageSize)
        {
            Values = values;
            TotalCount = totalCount;
            PageSize = pageSize;
        }
    }
}
