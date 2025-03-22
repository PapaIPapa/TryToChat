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
        public DbSet<AhuenniyChat.Models.Group> Group { get; set; } = default!;
        public DbSet<AhuenniyChat.Models.Call> Call { get; set; } = default!;


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

            modelBuilder.Entity<Group>()
                .HasMany(g => g.Users)
                .WithMany(u => u.Groups)
                .UsingEntity(j => j.ToTable("UserGroups"));

            modelBuilder.Entity<Call>()
                .HasOne(c => c.Group) // У звонка есть одна группа
                .WithMany(g => g.Calls) // У группы может быть много звонков
                .HasForeignKey(c => c.GroupId) // Внешний ключ в Call
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Call>()
                .HasMany(c => c.Users) // У звонка может быть много пользователей
                .WithMany(u => u.Calls) // У пользователя может быть много звонков
                .UsingEntity(j => j.ToTable("CallUser"));


        }
    }
}
