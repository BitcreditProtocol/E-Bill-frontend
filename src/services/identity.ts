type IdentityData = {
  name: string;
  company: string;
  date_of_birth: string;
  city_of_birth: string;
  country_of_birth: string;
  email: string;
  postal_address: string;
};

export async function createIdentity(data: IdentityData): Promise<unknown> {
  try {
    const response = await fetch("/identity/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${String(response.status)}`);
    }

    const result = await response.json() as unknown;

    return result;
  } catch (error) {
    console.error("Error creating identity:", error);
    throw error;
  }
}

export async function getIdentity(): Promise<IdentityData> {
  try {
    const response = await fetch(`/identity/return`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${String(response.status)}`);
    }

    const identity = await response.json() as IdentityData;

    return identity;
  } catch (error) {
    console.error("Error retrieving identity:", error);
    throw error;
  }
}
