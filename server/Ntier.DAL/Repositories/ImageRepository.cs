using Microsoft.EntityFrameworkCore;
using Ntier.DAL.Context;
using Ntier.DAL.Entities;
using Ntier.DAL.Interfaces;
using Ntier.DTO.DTO.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ntier.DAL.Repositories
{
    public class ImageRepository:IImageRepository
    {
        private readonly ShopContext _context;
        public ImageRepository( ShopContext context ) { 
            _context = context;
        }

        public async Task<ICollection<ProductImage>> AddImagesAsync(ICollection<ProductImage> images)
        {
            try
            {
                await _context.ProductImages.AddRangeAsync(images);
                await _context.SaveChangesAsync();
                var imgs = await _context.ProductImages.ToListAsync();
                return imgs;
            }
            catch ( Exception ex )
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task DeleteImagesAsync(string[] productsId)
        {
            try
            {
                foreach (var productId in productsId)
                {
                    await _context.Database.ExecuteSqlRawAsync($@"DELETE FROM PRODUCT_IMAGE WHERE PRODUCT_ID = '{productId}'");
                }
            }
            catch(Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
