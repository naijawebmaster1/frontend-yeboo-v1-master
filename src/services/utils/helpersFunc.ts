

export function getFileBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


export const filterGrooveByUserId = (id: string, array: any) => {
  const res = array.filter((data: any) => data.customerRef._id === id)
  return res
}

//Filter Grooves By Posted Type

export const filterGroovesByType = (type: string, array: any) => {
  const res = array.filter((data: any) => data.grooveType === type)
  return res
}

// Filter Users by the AccountType

export const filterUsersByAccount = (type: string, array: any) => {
  const res = array.filter((data: any) => data.accountType === type)
  return res
}



export function formatMoney(amount: number) {
  if (!amount) return 0
  const parts = amount?.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';
  const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formattedMoney = integerWithCommas + (decimalPart ? '.' + decimalPart : '');
  return formattedMoney;
}

export function formatDate(timestamp: any) {
  const dateObject = new Date(timestamp);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatTime(timestamp: any) {
  // const dateObject = new Date(timestamp);
  // const hours = dateObject.getUTCHours().toString().padStart(2, '0');
  // const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
  // return `${hours}:${minutes}`;
  const dateObject = new Date(timestamp);
  const hours = dateObject.getUTCHours().toString().padStart(2, '0');
  const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
  const seconds = dateObject.getUTCSeconds().toString().padStart(2, '0');
  // const milliseconds = dateObject.getUTCMilliseconds().toString().padStart(3, '0');
  return `${hours}:${minutes}:${seconds}`;

}


export const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      return {
        latitude,
        longitude
      }
    });
  } else {
    // console.log("Geolocation is not supported by this browser.");
  }
}

export const FilterAndGetTransactionSum = (transactions: any, transactionType: string) => {
  const filteredTransactions = transactions.filter((transaction: any) => transaction.walletTransactionType === transactionType);
  const sum = filteredTransactions.reduce((accumulator: any, transaction: any) => accumulator + Number(transaction.transactionAmount), 0);
  return formatMoney(Number(sum));
}

export const FilterOrderByStatus = (orders: any, orderStatus: string) => {
  const filteredOrders = orders.filter((order: any) => order?.status === orderStatus);
  return filteredOrders?.length
}

export const FilterUserOrderByStatus = (orders: any, orderStatus: string) => {
  const filteredOrders = orders.filter((order: any) => order?.status.toLowerCase() == orderStatus.toLowerCase());
  return filteredOrders
}

export const GetOrderPriceFromPackage = (orderPackages: any, ordered: string) => {
  const orderPrice = orderPackages?.find((order: any) => order?.name === ordered)
  return formatMoney(Number(orderPrice?.price))
}

export const GetOrderDescriptionFromPackage = (orderPackages: any, ordered: string) => {
  const orderPrice = orderPackages?.find((order: any) => order?.name === ordered)
  return orderPrice?.description
}



export function filterAndFormatPrices(products: any) {
  const filteredProducts = [];
  for (const product of products) {
    if (parseFloat(product.perSession) > 0) {
      // const formattedPrice = parseFloat(product.price);
      const filteredProduct = {
        name: product.name,
        perSession: parseFloat(product.perSession),
        perDay: parseFloat(product.perDay),
        description: product.description,
      };
      filteredProducts.push(filteredProduct);
    }
  }

  return filteredProducts;
}





export function searchUsersFromTerms(arr: any, searchTerm: string) {

  const matchingUsers = arr.filter((user: any) => {

    const firstNameMatch = user.firstname.toLowerCase().includes(searchTerm.toLowerCase());
    const lastNameMatch = user.lastname.toLowerCase().includes(searchTerm.toLowerCase());
    const usernameMatch = user.username.toLowerCase().includes(searchTerm.toLowerCase());

    return firstNameMatch || lastNameMatch || usernameMatch;
  });

  return matchingUsers
}

export function extractYear(dateStr: string): number | null {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return null;
  }

  return date.getFullYear();
}


export function filterUserByAccountType(arr: any, type: string) {
  const res = arr.filter((user: any) => user.accountType === type)
  return res
}


export function getHighestTransactionAmount(transactions: any) {
  // Filter transactions where creditDebit is "Credit" and walletTransactionType is "Groove Order"
  const filteredTransactions = transactions.filter((transaction: any) =>
    transaction.creditDebit === "Credit" && transaction.walletTransactionType === "Groove Order"
  );

  // Check if there are any matching transactions
  if (filteredTransactions.length > 0) {
    // Find the transaction with the highest transactionAmount
    const highestTransaction = filteredTransactions.reduce((maxTransaction: any, currentTransaction: any) =>
      parseFloat(currentTransaction.transactionAmount) > parseFloat(maxTransaction.transactionAmount)
        ? currentTransaction
        : maxTransaction
    );

    // Return the highest transaction amount
    return parseFloat(highestTransaction.transactionAmount);
  } else {
    // No matching transactions found
    return 0; // or you can return null, depending on your preference
  }
}



export function getTotalAmountForMonth(month: number, transactions: any) {
  // Filter transactions for the specified month
  const filteredTransactions = transactions?.filter((transaction: any) => {
    const transactionMonth = new Date(transaction.transactionDate).getUTCMonth() + 1; // +1 because months are zero-indexed
    return transactionMonth === month;
  });

  // Calculate the total amount earned for the month
  const totalAmount = filteredTransactions?.reduce((sum: any, transaction: any) =>
    transaction.creditDebit === "Credit" && transaction.walletTransactionType === "Groove Order"
      ? sum + parseFloat(transaction.transactionAmount)
      : sum,
    0
  );
  return totalAmount;
}

export function getTotalAmountForYear(year: any, transactions: any) {
  // Filter transactions for the specified year
  const filteredTransactions = transactions?.filter((transaction: any) => {
    const transactionYear = new Date(transaction.transactionDate).getUTCFullYear();
    return transactionYear === year;
  });

  // Calculate the total amount earned for the year
  const totalAmount = filteredTransactions?.reduce((sum: any, transaction: any) =>
    transaction.creditDebit === "Credit" && transaction.walletTransactionType === "Groove Order"
      ? sum + parseFloat(transaction.transactionAmount)
      : sum,
    0
  );

  return totalAmount;
}

export function dateDifference(dateStr1: any, dateStr2: any) {

  if (!dateStr1 || !dateStr2) return 0
  // Convert date strings to Date objects
  const date1: any = new Date(dateStr1);
  const date2: any = new Date(dateStr2);

  // Calculate the difference in milliseconds
  const differenceInMs = Math.abs(date2 - date1);

  // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const differenceInDays = differenceInMs / (24 * 60 * 60 * 1000);

  return differenceInDays;
}


export function extractNumberFromString(str: string) {
  const match = str?.match(/\d+/); // Use regular expression to match digits
  return match ? parseInt(match[0], 10) : null; // Parse the matched digits as an integer
}



export function filterRequestedOrders(orders: any, status: string) {
  const filtered = orders?.filter((order: any) => order?.status === status)
  return filtered
}

export function formatOrderDate(inputDate: any) {
  const dateParts = inputDate.split('/'); // Split the input date string
  const day = parseInt(dateParts[1], 10);
  const month = parseInt(dateParts[0], 10);
  const year = parseInt(dateParts[2], 10);

  // Create a Date object using the parsed parts
  const formattedDate = new Date(year, month - 1, day);

  // Define month names
  const monthNames = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
    'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
  ];

  // Format the date as "DD Mon. YYYY"
  const formattedString = `${formattedDate.getDate()} ${monthNames[formattedDate.getMonth()]} ${formattedDate.getFullYear()}`;

  return formattedString;
}



export function formatOrderDate2(inputDateString: string) {
  const inputDate = new Date(inputDateString);

  // Options for formatting the date
  const options: any = { day: 'numeric', month: 'short', year: 'numeric' };

  // Format the date using toLocaleDateString
  const formattedDate = inputDate.toLocaleDateString('en-US', options);

  return formattedDate;
}

export function formatChatTimestamp(timestamp: any) {
  const date = new Date(timestamp);
  const options: any = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedTime;
}


export function countFilesUploaded(fileUrls: string[]): { imageCount: number; videoCount: number } {
  const imageExtensions: Set<string> = new Set(['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg']);
  const videoExtensions: Set<string> = new Set(['mp4', 'avi', 'mov', 'wmv', 'flv']);
  let imageCount: number = 0;
  let videoCount: number = 0;

  fileUrls.forEach(url => {
    const extension: string = url.split('.').pop()?.toLowerCase() || '';
    if (imageExtensions.has(extension)) {
      imageCount++;
    } else if (videoExtensions.has(extension)) {
      videoCount++;
    }
  });

  return { imageCount, videoCount };
}

export function convertDateFormat(inputDate: string) {
  const dateParts = inputDate.split("-");
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  return formattedDate;
}
