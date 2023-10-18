import type { OptionType } from "@cycle9898/react-custom-dropdown-component/dist/types/Dropdown";

export const monthsOptions: OptionType[] = [
    {
        id: "1",
        value: "January"
    },
    {
        id: "2",
        value: "February"
    },
    {
        id: "3",
        value: "March"
    },
    {
        id: "4",
        value: "April"
    },
    {
        id: "5",
        value: "May"
    },
    {
        id: "6",
        value: "June"
    },
    {
        id: "7",
        value: "July"
    },
    {
        id: "8",
        value: "August"
    },
    {
        id: "9",
        value: "September"
    },
    {
        id: "10",
        value: "October"
    },
    {
        id: "11",
        value: "November"
    },
    {
        id: "12",
        value: "December"
    }
];

export const yearsOptions: OptionType[] = Array.from({ length: 101 },(_,index) => {
    return {
        id: `${index + 1}`,
        value: (1950 + index).toString()
    };
});
