export type ReceivedEmployeeData = {
    _id: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    startDate: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    department: string,
    __v: number
};

class FormattedEmployee {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    startDate: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    department: string;

    constructor(employeeData: ReceivedEmployeeData) {
        this.id = employeeData._id;
        this.firstName = employeeData.firstName;
        this.lastName = employeeData.lastName;
        this.birthDate = employeeData.birthDate;
        this.startDate = employeeData.startDate;
        this.street = employeeData.street;
        this.city = employeeData.city;
        this.state = employeeData.state;
        this.zipCode = employeeData.zipCode;
        this.department = employeeData.department;
    }
}

export default FormattedEmployee;