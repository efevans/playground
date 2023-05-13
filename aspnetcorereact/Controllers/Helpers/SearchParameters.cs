using aspnetcorereact.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace aspnetcorereact.Controllers.Helpers
{
    [BindProperties]
    public class SearchParameters
    {
        public int PageNum { get; set; }
        private int RealPageNum => PageNum == 0 ? 1 : PageNum;
        private int _pageSize = 10;
        public int PageSize => _pageSize;
        public int Skip => (RealPageNum - 1) * PageSize;
    }
}
