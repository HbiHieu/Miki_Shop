using System;
using System.Collections.Generic;

namespace Ntier.DAL.Entities
{
    public partial class ProductImage
    {
        public string Url { get; set; } = null!;
        public int? ProductId { get; set; }

        public virtual Product? Product { get; set; }
    }
}
