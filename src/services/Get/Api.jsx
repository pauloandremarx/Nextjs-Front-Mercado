export async function getCategory() {
    const res = await fetch(
        `http://localhost:8080/category/`,
        {
            method: "GET",
        }
    );
    if (!res.ok) {
        throw new Error("Logs Failed to fetch data");
    }
    return await res.json();
}

export async function getFindCategory(id) {
    const res = await fetch(
        `http://localhost:8080/category/`+id,
        {
            method: "GET",
        }
    );
    if (!res.ok) {
        throw new Error("Logs Failed to fetch data");
    }
    return await res.json();
}

  export async function getProducts() {
    const res = await fetch(
        `http://localhost:8080/products/`,
        {
            method: "GET",
        }
    );
    if (!res.ok) {
        throw new Error("Logs Failed to fetch data");
    }
    return await res.json();
}

export async function getFindProducts(id) {
    const res = await fetch(
        `http://localhost:8080/products/`+id,
        {
            method: "GET",
        }
    );
    if (!res.ok) {
        throw new Error("Logs Failed to fetch data");
    }
    return await res.json();
}

export async function getTax() {
    const res = await fetch(
        `http://localhost:8080/tax/`,
        {
            method: "GET",
        }
    );
    if (!res.ok) {
        throw new Error("Logs Failed to fetch data");
    }
    return await res.json();
}

export async function getFindTax(id) {
    const res = await fetch(
        `http://localhost:8080/tax/`+id,
        {
            method: "GET",
        }
    );
    if (!res.ok) {
        throw new Error("Logs Failed to fetch data");
    }
    return await res.json();
}

export async function getUsers() {
    const res = await fetch(
        `http://localhost:8080/users/`,
        {
            method: "GET",
        }
    );
    if (!res.ok) {
        throw new Error("Logs Failed to fetch data");
    }
    return await res.json();
}