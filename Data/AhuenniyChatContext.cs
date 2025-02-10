using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AhuenniyChat.Models;

namespace AhuenniyChat.Data
{
    public class AhuenniyChatContext : DbContext
    {
        public AhuenniyChatContext (DbContextOptions<AhuenniyChatContext> options)
            : base(options)
        {

        }

        public DbSet<AhuenniyChat.Models.User> User { get; set; } = default!;
        public DbSet<AhuenniyChat.Models.Message> Message { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany()
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Recipient)
                .WithMany()
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
