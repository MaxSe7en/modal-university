export function getYear() {
  return new Date().getUTCFullYear() + 1;
}
export function getActiveAcademicYear() {
  return new Date().getUTCFullYear() + 1;
}

// Utils/validation.ts
export const validateInput = (value: string, validationRules: { [key: string]: RegExp }) => {
  for (const rule in validationRules) {
    if (!validationRules[rule].test(value)) {
      return false;
    }
  }
  return true;
};

export function formatDate(timestamp: string): string {
  // Create a Date object from the given timestamp
  const date = new Date(timestamp);

  // Define options for formatting the date
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  // Format the date to "Month Day, Year"
  return date.toLocaleDateString('en-US', options);
}


export const sendSms = async (to: string, message: string): Promise<any> => {
  const clientId: string | undefined = process.env.NEXT_PUBLIC_ASHUDIOSDFKJFLJHA;
  const clientSecret: string | undefined = process.env.NEXT_PUBLIC_FUTOMACAANUISGFG;

  if (!clientId || !clientSecret) {
    throw new Error('Client ID or Client Secret is not set in environment variables');
  }

  const params: URLSearchParams = new URLSearchParams({
    From: 'ModalColege',
    To: to,
    Content: message,
    ClientId: clientId,
    ClientSecret: clientSecret,
  });

  const url: string = `https://smsc.hubtel.com/v1/messages/send?${params.toString()}`;

  try {
    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      const responseData: any = await response.json();
      console.log('SMS sent successfully:', responseData);
      return responseData;
    } else {
      const errorBody: string = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }
  } catch (error: any) {
    console.error('Error sending SMS:', error instanceof Error ? error.message : String(error));
 

    throw error;
  }
};
