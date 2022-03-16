using System.ComponentModel.DataAnnotations;

namespace TodoList.API.Models;

public class TodoItem
{
    public int Id { get; set; }
    
    [Required, StringLength(500)]
    public string Title { get; set; }
    
    [StringLength(5000)]
    public string? Description { get; set; }

    public Boolean DoneState { get; set; } = false;
}