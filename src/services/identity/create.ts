type IdentityCreatePayload = {
  name: string;
  email: string;
  postal_address: string;
  date_of_birth: string;
  country_of_birth: string;
  city_of_birth: string;
  identification_number: string;
  profile_picture_upload_id: string;
  identity_document_upload_id: string;
};

export const createIdentity = async (data: IdentityCreatePayload) => {
  const response = await fetch("/identity/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create identity");
  }
};
