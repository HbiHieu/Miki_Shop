using System;
using System.Collections.Generic;

namespace Ntier.DAL.Entities
{
    public partial class Product
    {
        public Product()
        {
            ProductImages = new HashSet<ProductImage>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Sale { get; set; }
        public int? Amount { get; set; }
        public string? Description { get; set; }
        public int? Size { get; set; }
        public string? Color { get; set; }
        public int? Price { get; set; }
        public int? Quantity { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category? Category { get; set; }
        public virtual ICollection<ProductImage> ProductImages { get; set; }
    }
}
