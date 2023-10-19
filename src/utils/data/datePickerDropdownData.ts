import type { OptionType } from "@cycle9898/react-custom-dropdown-component/dist/types/Dropdown";

export const monthsOnly: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const monthsOptions: OptionType[] = Array.from({ length: 12 },(_,index) => {
    return {
        id: `${index + 1}`,
        value: monthsOnly[index]
    };
});

export const yearsOptions: OptionType[] = Array.from({ length: 101 },(_,index) => {
    return {
        id: `${index + 1}`,
        value: (1950 + index).toString()
    };
});
