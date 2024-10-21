type IdentityData = {
  name: string;
  company: string;
  date_of_birth: string;
  city_of_birth: string;
  country_of_birth: string;
  email: string;
  postal_address: string;
};

export async function createIdentity(data: IdentityData): Promise<void> {
  try {
    const response = await fetch("/identity/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const identity: IdentityData = await response.json();

    return identity;
  } catch (error) {
    console.error("Error retrieving identity:", error);
    throw error;
  }
}
