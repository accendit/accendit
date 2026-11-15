var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.Accendit_Blazor>("blazor")
    .WithExternalHttpEndpoints();

builder.Build().Run();