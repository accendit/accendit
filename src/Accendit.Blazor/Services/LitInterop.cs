using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace Accendit.Blazor.Services;

public sealed class LitInterop(IJSRuntime js) : IAsyncDisposable
{
    private IJSObjectReference? _module;

    public Task SyncAsync(
        string syncMethod,
        ElementReference host,
        DotNetObjectReference<object> dotNetRef,
        object state,
        CancellationToken cancellationToken = default)
        => InvokeAsync(syncMethod, host, dotNetRef, state, cancellationToken);

    public async ValueTask DisposeAsync()
    {
        if (_module is not null)
        {
            try
            {
                await _module.DisposeAsync();
            }
            catch (JSDisconnectedException)
            {
            }
        }
    }

    private async Task InvokeAsync(
        string method,
        ElementReference host,
        DotNetObjectReference<object> dotNetRef,
        object state,
        CancellationToken cancellationToken)
    {
        try
        {
            var module = await GetModuleAsync(cancellationToken);
            await module.InvokeVoidAsync(method, cancellationToken, host, dotNetRef, state);
        }
        catch (JSDisconnectedException)
        {
        }
        catch (JSException)
        {
        }
    }

    private async Task<IJSObjectReference> GetModuleAsync(CancellationToken cancellationToken)
    {
        if (_module is not null)
        {
            return _module;
        }

        try
        {
            _module = await js.InvokeAsync<IJSObjectReference>("import", cancellationToken, "./js/accendit-ui.js");
        }
        catch (JSDisconnectedException)
        {
            throw;
        }
        catch (JSException)
        {
            throw;
        }

        return _module;
    }
}