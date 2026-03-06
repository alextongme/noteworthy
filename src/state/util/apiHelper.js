// Shared fetch wrapper that mimics jQuery $.ajax behavior:
// - Resolves with parsed JSON on success
// - Rejects with { responseJSON } on error (for compatibility with existing action creators)
export async function apiFetch(url, options = {}) {
    const res = await fetch(url, {
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        const error = new Error(res.statusText);
        error.responseJSON = data;
        throw error;
    }

    return data;
}
