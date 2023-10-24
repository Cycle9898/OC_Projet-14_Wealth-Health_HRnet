/**
 * @description
 * Function that check if a string have at least 2 characters,
 * otherwise, return an error message
 * 
 * @param text - The string that need to be checked
 * 
 * @returns - An error message, if the test fails, or null
 */
export function checkGenericString(text: string) {
    if (text.length >= 2) {
        return null;
    }

    return "This field should be at least 2 characters";
}

/**
 * @description
 * Function that check if a zip code (string) is valid,
 * otherwise, return an error message
 * 
 * @param zipCode - The zip code (string) that need to be checked
 * 
 * @returns - An error message, if the test fails, or null
 */
export function checkZipCodeString(zipCode: string) {
    const valideZipCodeRegex: RegExp = /^\d{5}(?:-\d{4})?$/;

    if (valideZipCodeRegex.test(zipCode)) {
        return null;
    }

    return "The ZIP code is invalid (12345[-6789])";
}

/**
 * @description
 * Function that check if a date (string) is valid,
 * otherwise, return an error message
 * 
 * @param dateString - The date (string) that need to be checked
 * 
 * @returns - An error message, if the test fails, or null
 */
export function checkDateString(dateString: string) {
    const splitDateString: string[] = dateString.split("/");

    if (splitDateString.length === 3) {
        const isMonthValid: boolean = splitDateString[0].length === 2 && parseInt(splitDateString[0]) <= 12;
        const isDayValid: boolean = splitDateString[1].length === 2 && parseInt(splitDateString[1]) <= 31;
        const isYearValid: boolean = splitDateString[2].length === 4 && !!parseInt(splitDateString[2]);

        if (isMonthValid && isDayValid && isYearValid) {
            return null;
        }
    }

    return "The date format is incorrect (MM/DD/YYYY)";
}

export type EmployeeFormFieldsType = {
    firstName: string,
    lastName: string,
    birthDate: string,
    startDate: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    department: string
}

/**
 * @description
 * Function that check validity of all employee form fields
 * 
 * @param firstName - Value of the input field "First Name"
 * @param lastName - Value of the input field "Last Name"
 * @param birthDate - Value of the date picker input field "Date of Birth"
 * @param startDate - Value of the date picker input field "Start Date"
 * @param street - Value of the input field "Street"
 * @param city - Value of the input field "City"
 * @param state - The custom dropdown list displayed value "State"
 * @param zipCode - Value of the input field "Zip Code"
 * @param department - The custom dropdown list displayed value "Department"
 * 
 * @returns A boolean, "true" if all tested fields are valid, otherwise "false"
 */
export function ValidateEmployeeForm({
    firstName,
    lastName,
    birthDate,
    startDate,
    street,
    city,
    state,
    zipCode,
    department
}: EmployeeFormFieldsType) {
    // Check validity of all employee form fields with validation functions array
    const testFunctionsArray: (string | null)[] = [
        checkGenericString(firstName),
        checkGenericString(lastName),
        checkDateString(birthDate),
        checkDateString(startDate),
        checkGenericString(street),
        checkGenericString(city),
        checkGenericString(state),
        checkZipCodeString(zipCode),
        checkGenericString(department)
    ];

    return testFunctionsArray.every((testFunction) => testFunction === null);
}